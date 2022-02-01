const express = require('express');
const router = express.Router();
const User = require('../models/user')

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json()
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

/* GET individual user. */
router.get('/:id', function(req, res, next) {
  res.send(req.params.id)
});

/* Create user. */
router.post('/', async (req, res) => {
  console.log(req)
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

/* Update user. */
router.patch('/:id', function(req, res, next) {
  
});

/* Delete user. */
router.delete('/:id', function(req, res, next) {
  
});

module.exports = router;
