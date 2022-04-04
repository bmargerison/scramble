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
    ingredients: req.body.ingredients,
    image: req.body.image
  })
  try {
    const newRecipe = await recipe.save()
    res.status(201).json(newRecipe)
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ message: err.message })
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    let recipe = await Recipe.findById(req.params.id)
    await recipe.remove()
    res.status(202).json(recipe)
  } catch (err) {
    res.status(404).json({ message: "Cannot find list" })
  }
};

module.exports = {getAllRecipes, newRecipe, deleteRecipe};
