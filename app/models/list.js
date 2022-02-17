const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: () => new Date(+new Date()),
    required: false
  },
  items: {
    type: Array,
    required: false,
    default: []
  }
})

module.exports = mongoose.model('List', listSchema)