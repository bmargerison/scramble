const express = require('express');
const router = express.Router();
const Item = require('../models/item')
const itemController = require('../controllers/item')

/* GET all items. */
router.get('/', itemController.getAllItems)

/* Create item. */
router.post('/', itemController.newItem)

module.exports = router;
