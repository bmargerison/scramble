const express = require('express');
const router = express.Router();
const List = require('../models/list')
const listController = require('../controllers/list')

/* GET all lists. */
router.get('/', listController.getAllLists)

/* GET individual user. */
router.get('/:id', listController.getList)

/* Create list. */
router.post('/', listController.newList)

module.exports = router;
