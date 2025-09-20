const router = require('express').Router();
const Project = require('../Models/project.model'); 
const fetch = require('node-fetch');

// list
router.route('/').get((req, res) => {
  Project.find()
    .sort({ createdAt: -1 })
    .then(ps => res.json(ps))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get by id
router.route('/:id').get((req, res) => {
  Project.findById(req.params.id)
    .then(p => res.json(p))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add
router.route('/add').post((req, res) => {
  const t = req.body.title;
  const d = req.body.description;
  const ts = req.body.techStack || [];
  const gh = req.body.github || '';
  const live = req.body.liveDemo || '';
  const importedFromGithub = req.body.importedFromGithub || false;

  const newP = new Project({
    title: t,
    description: d,
    techStack: ts,
    github: gh,
    liveDemo: live,
    importedFromGithub: importedFromGithub
  });

  newP.save()
    .then(() => res.status(201).json('Project added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// update
router.route('/update/:id').post((req, res) => {
  Project.findById(req.params.id)
    .then(p => {
      if (!p) return res.status(404).json('Not found');
      p.title = req.body.title ?? p.title;
      p.description = req.body.description ?? p.description;
      p.techStack = req.body.techStack ?? p.techStack;
      p.github = req.body.github ?? p.github;
      p.liveDemo = req.body.liveDemo ?? p.liveDemo;
      

      p.save()
        .then(() => res.json('Project updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete
router.route('/:id').delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json('Project deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Import from GitHub route
router.route('/import-github').post(async (req, res) => {
    try {
        const { githubUsername } = req.body;
        const githubToken = process.env.GITHUB_PAT;
        
        if (!githubUsername) {
            return res.status(400).json({ 
                message: 'GitHub username is required' 
            });
        }

        if (!githubToken) {
            return res.status(400).json({
                message: 'GitHub PAT is not configured'
            });
        }

        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos`, 
            {
                headers: {
                    'Authorization': `Bearer ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const repos = await response.json();
        
        const portfolioProjects = await Promise.all(repos.map(async (repo) => {
            const topicsResponse = await fetch(
                `https://api.github.com/repos/${githubUsername}/${repo.name}/topics`,
                {
                    headers: {
                        'Authorization': `Bearer ${githubToken}`,
                        'Accept': 'application/vnd.github.mercy-preview+json'
                    }
                }
            );
            const topicsData = await topicsResponse.json();
            return {
                ...repo,
                topics: topicsData.names || []
            };
        }));

        const filteredProjects = portfolioProjects.filter(repo => 
            repo.topics.includes('portfolio')
        );

        const savedProjects = [];
        const errors = [];

        for (const repo of filteredProjects) {
            try {
                const projectData = {
                    title: repo.name,
                    description: repo.description || 'No description available',
                    github: repo.html_url,
                    liveDemo: repo.homepage || '',
                    techStack: repo.topics || [],
                    importedFromGithub: true
                };

                const existingProject = await Project.findOne({ 
                    github: repo.html_url 
                });

                if (!existingProject) {
                    const newProject = new Project(projectData);
                    await newProject.save();
                    savedProjects.push(newProject);
                }
            } catch (err) {
                errors.push(`Failed to import ${repo.name}: ${err.message}`);
            }
        }

        res.json({
            message: 'GitHub projects import completed',
            imported: savedProjects.length,
            projects: savedProjects,
            errors: errors
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Failed to import GitHub projects',
            error: error.message 
        });
    }
});

// ...existing code...

module.exports = router;
