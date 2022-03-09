const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  _list: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'List',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Fruit & Vegetables', 'Health & Beauty', 'Dairy', 'Meat and Fish', 'Other Cold Foods', 'Frozen', 'Pantry', 'Bakery', 'Drinks', 'Other'],
  }
})

module.exports = mongoose.model('Item', itemSchema)