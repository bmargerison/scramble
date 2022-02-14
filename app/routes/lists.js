const express = require('express');
const router = express.Router();
const List = require('../models/list')

/* GET all lists. */
router.get('/', async (req, res) => {
  try {
    let lists = await List.find()
    res.json(lists)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

/* GET individual user. */
router.get('/:id', async (req, res) => {
  list = await List.findById(req.params.id)
  res.json(list)
});

/* Create list. */
router.post('/', async (req, res) => {
  const list = new List({
    _user: req.body._user
  })
  try {
    const newList = await list.save()
    res.status(201).json(newList)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
});

module.exports = router;
