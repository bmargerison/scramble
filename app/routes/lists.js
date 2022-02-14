const express = require('express');
const router = express.Router();
const List = require('../models/list')

router.get('/', async (req, res) => {
  try {
    let lists = await List.find()
    res.json(lists)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

module.exports = router;
