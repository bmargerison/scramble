const express = require('express');
const user = require('../models/user');
const router = express.Router();
const User = require('../models/user')

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    let users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

/* GET individual user. */
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
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

/* Delete user. */
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: "Deleted subscriber" })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
});

async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.user = user
  next()
}

module.exports = router;
