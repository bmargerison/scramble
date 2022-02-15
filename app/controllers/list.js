const express = require('express');
const router = express.Router();
const List = require('../models/list')

const getAllLists = async (req, res, next) => {
  try {
    let lists = await List.find()
    res.json(lists)
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

module.exports = {getAllLists, getList, newList};
