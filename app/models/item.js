const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Fruit & Vegetables', 'Health & Beauty', 'Dairy', 'Meat and Fish', 'Other Cold Foods', 'Frozen', 'Pantry', 'Bakery', 'Drinks']
  }
})

module.exports = mongoose.model('Item', itemSchema)