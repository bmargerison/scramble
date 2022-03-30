const Recipe = require('../models/recipe')

const getAllRecipes = async (req, res, next) => {
  try {
    let recipe = await Recipe.find()
    res.json(recipe)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
};

module.exports = {getAllRecipes};
