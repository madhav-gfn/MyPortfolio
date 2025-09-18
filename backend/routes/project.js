const router = require('express').Router();
const Project = require('../Models/project.model'); 


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

  const newP = new Project({
    title: t,
    description: d,
    techStack: ts,
    github: gh,
    liveDemo: live
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

module.exports = router;
