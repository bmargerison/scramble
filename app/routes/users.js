const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;
const { body, validationResult } = require('express-validator');

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
router.get('/:id', authenticateUser, (req, res) => {
  res.json(res.user)
});

/* User login. */
router.post('/login', async (req, res) => {
  try {
    let user = await User.find({ email: req.body.email })
    user = user.shift()
    if (!user) {
      return res.status(404).json({ message: "Cannot find user" })
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(403).json({ message: "Incorrect password" })
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
router.post('/', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be strong').isStrongPassword()
  ], 
  async (req, res) => {
    let hashedPassword
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() })
    }
    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    }
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
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    await res.user.remove()
    res.status(202).json({ message: "Deleted subscriber" })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
});

/* Authenticate user. */
async function authenticateUser(req, res, next) {
  let user
  const token = await req.get("x-access-token")
  if (!token) {
    res.status(403).json({ message: "No authentication token provided" })
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) { res.status(403).json({ message: "Authentication failed" })}
    }) 
  }
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
