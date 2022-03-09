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
    name: req.body.name,
    _user: req.body._user,
    _list: req.body._list,
    type: req.body.type
  })
  try {
    const newItem = await item.save()
    res.status(201).json(newItem)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
};

const getUserItems = async (req, res, next) => {
  try {
    let items = await Item.find() || []
    let userItems = []
    items.forEach(item => {
      if (item._user == req.params.id) {
        userItems.push(item)
      }
    })
    res.json(userItems)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
};

module.exports = {getAllItems, newItem, getUserItems};