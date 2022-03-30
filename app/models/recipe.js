const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    validate: v => Array.isArray(v) && v.length > 0,
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)