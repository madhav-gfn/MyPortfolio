const router = require('express').Router();
const ContactMe = require('../Models/contact.model'); 

// list
router.route('/').get((req, res) => {
  ContactMe.find()
    .sort({ createdAt: -1 })
    .then(cs => res.json(cs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get single
router.route('/:id').get((req, res) => {
  ContactMe.findById(req.params.id)
    .then(c => res.json(c))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add message
router.route('/add').post((req, res) => {
  const n = req.body.name;
  const e = req.body.email;
  const m = req.body.message;

  const newC = new ContactMe({
    name: n,
    email: e,
    message: m
  });

  newC.save()
    .then(() => res.status(201).json('Message added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete
router.route('/:id').delete((req, res) => {
  ContactMe.findByIdAndDelete(req.params.id)
    .then(() => res.json('Message deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
