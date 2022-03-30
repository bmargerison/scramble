const Recipe = require('../models/recipe')

const getAllRecipes = async (req, res, next) => {
  try {
    let recipe = await Recipe.find()
    res.json(recipe)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
};

const newRecipe = async (req, res, next) => {
  const recipe = new Recipe({
    _user: req.body._user,
    url: req.body.url,
    name: req.body.name,
    ingredients: req.body.ingredients
  })
  try {
    const newRecipe = await recipe.save()
    res.status(201).json(newRecipe)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
};

module.exports = {getAllRecipes, newRecipe};
