const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bycrypt = require('bcrypt');
const saltRounds = 10;

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

/* User login. */
router.post('/login', async (req, res) => {
  try {
    let user = await User.find({ email: req.body.email })
    user = user.shift()
    if (!user) {
      return res.status(404).json({ message: "Cannot find user" })
    }
    if (!bycrypt.compareSync(req.body.password, user.password)) {
      res.status(403).json({ message: "Incorrect password" })
    }
    const id = user.id
    const token = jwt.sign({id}, "jwtSecret", {
      expiresIn: 300
    })
    res.status(200).json({ auth: true, token: token, user: user })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
});

/* Create user. */
router.post('/', async (req, res) => {
  const hashedPassword = await bycrypt.hash(req.body.password, saltRounds)
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
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
    res.status(202).json({ message: "Deleted subscriber" })
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
