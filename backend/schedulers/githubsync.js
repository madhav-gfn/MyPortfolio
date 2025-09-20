const cron = require('node-cron');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Project = require('../Models/project.model');

const syncGithubProjects = async () => {
    try {
        const githubUsername = process.env.GITHUB_USERNAME;
        const githubToken = process.env.GITHUB_PAT;
        
        if (!githubUsername || !githubToken) {
            console.error('GitHub credentials not configured');
            return;
        }

        console.log('Starting GitHub projects sync...');

        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos`,
            {
                headers: {
                    'Authorization': `Bearer ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

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

        let updated = 0;
        let added = 0;

        for (const repo of filteredProjects) {
            const projectData = {
                title: repo.name,
                description: repo.description || 'No description available',
                github: repo.html_url,
                liveDemo: repo.homepage || '',
                techStack: repo.topics || [],
                importedFromGithub: true
            };

            const existingProject = await Project.findOne({ github: repo.html_url });

            if (existingProject) {
                await Project.findByIdAndUpdate(existingProject._id, projectData);
                updated++;
            } else {
                const newProject = new Project(projectData);
                await newProject.save();
                added++;
            }
        }

        console.log(`GitHub sync completed: ${added} projects added, ${updated} projects updated`);

    } catch (error) {
        console.error('GitHub sync failed:', error.message);
    }
};

const schedule = cron.schedule('0 0 * * *', () => {
    syncGithubProjects();
});
syncGithubProjects();

module.exports = {
    schedule,
    syncGithubProjects,
    start: () => schedule.start()
};