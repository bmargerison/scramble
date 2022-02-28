const List = require('../models/list')

const getAllLists = async (req, res, next) => {
  try {
    let lists = await List.find()
    res.json(lists)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
};

const getUserLists = async (req, res, next) => {
  try {
    let lists = await List.find() || []
    let userLists = []
    lists.forEach(list => {
      if (list._user == req.params.id) {
        userLists.push(list)
      }
    })
    res.json(userLists)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
};

const getList = async (req, res, next) => {
  try {
    let list = await List.findById(req.params.id)
    res.status(200).json(list)
  } catch (err) {
    res.status(404).json({ message: "Cannot find list" })
  }
};

const newList = async (req, res, next) => {
  const list = new List({
    _user: req.body._user
  })
  try {
    const newList = await list.save()
    res.status(201).json(newList)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
};

const deleteList = async (req, res, next) => {
  try {
    let list = await List.findById(req.params.id)
    await list.remove()
    res.status(202).json(list)
  } catch (err) {
    res.status(404).json({ message: "Cannot find list" })
  }
};

const updateItems = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(404).json({ message: "Cannot find list" })
  }
  try {
    const list = await List.findById(req.params.id)
    const items = await list.items
    list.items.push(req.body.item)
    await list.updateOne({ items: items })
    res.status(204).json(list)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
};

module.exports = {getAllLists, getUserLists, getList, newList, deleteList, updateItems};