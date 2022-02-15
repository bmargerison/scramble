const express = require('express');
const router = express.Router();
const List = require('../models/list')
const listController = require('../controllers/list')

/* GET all lists. */
router.get('/', listController.getAllLists)

/* GET all lists for given user. */
router.get('/user/:id', listController.getUserLists)

/* GET individual user. */
router.get('/:id', listController.getList)

/* Create list. */
router.post('/', listController.newList)

module.exports = router;
