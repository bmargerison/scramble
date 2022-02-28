const Item = require('../models/item')

const getAllItems = async (req, res, next) => {
  try {
    let items = await Item.find()
    res.json(items)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
};

const newItem = async (req, res, next) => {
  const item = new Item({
    _user: req.body._user,
    type: req.body.type
  })
  try {
    const newItem = await item.save()
    res.status(201).json(newItem)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
};

module.exports = {getAllItems, newItem};