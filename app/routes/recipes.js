const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe')
const recipeController = require('../controllers/recipe')

/* GET all items. */
router.get('/', recipeController.getAllRecipes)

module.exports = router;