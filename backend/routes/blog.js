const router = require('express').Router();
const Blog = require('../Models/blog.model'); 

// list all
router.route('/').get((req, res) => {
  Blog.find()
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get by id
router.route('/:id').get((req, res) => {
  Blog.findById(req.params.id)
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add
router.route('/add').post((req, res) => {
  const t = req.body.title;
  const c = req.body.content;
  const a = req.body.author;
  const tags = req.body.tags || [];

  const newBlog = new Blog({
    title: t,
    content: c,
    author: a,
    tags
  });

  newBlog.save()
    .then(() => res.status(201).json('Blog added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// update
router.route('/update/:id').post((req, res) => {
  Blog.findById(req.params.id)
    .then(b => {
      if (!b) return res.status(404).json('Not found');
      b.title = req.body.title ?? b.title;
      b.content = req.body.content ?? b.content;
      b.author = req.body.author ?? b.author;
      b.tags = req.body.tags ?? b.tags;

      b.save()
        .then(() => res.json('Blog updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete
router.route('/:id').delete((req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json('Blog deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
