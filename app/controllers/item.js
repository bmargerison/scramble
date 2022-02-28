const Item = require('../models/item')

const getAllItems = async (req, res, next) => {
  try {
    let items = await Item.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
};

module.exports = {getAllItems};