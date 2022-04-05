const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe')
const recipeController = require('../controllers/recipe')

/* GET all recipe. */
router.get('/', recipeController.getAllRecipes)

/* GET all lists for given user. */
router.get('/user/:id', recipeController.getUserRecipes)

/* Create recipe. */
router.post('/', recipeController.newRecipe)

/* Delete recipe. */
router.delete('/:id', recipeController.deleteRecipe)

module.exports = router;