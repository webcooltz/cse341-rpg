const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Item = require('../models/item');

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('items').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const itemId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('items').find({ _id: itemId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createItem = async (req, res) => {
  const item = new Item({
    name: req.body.charName,
    level: req.body.level,
    rarity: req.body.rarity,
    amount: req.body.amount
  });
  const response = await mongodb.getDb().db().collection('items').insertOne(item);
  if (response.acknowledged) {
    res.status(201).json({
      response: response,
      message: "Created new Item successfully.",
      item: item
    });
  } else {
      res.status(500).json(response.error || 'Some error occurred while creating the item.');
  }
  };
  
  const updateItem = async (req, res) => {
    const itemId = new ObjectId(req.params.id);
    const item = new Item({
        name: req.body.charName,
        level: req.body.level,
        rarity: req.body.rarity,
        amount: req.body.amount
      });
    const response = await mongodb
      .getDb()
      .db()
      .collection('items')
      .replaceOne({ _id: itemId }, item);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).json({
        response: response,
        message: "Updated item successfully.",
        item: item
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the item.');
    }
  };
  
  const deleteItem = async (req, res) => {
    const itemId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('items').deleteOne({ _id: itemId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).json({
        response: response,
        message: "Deleted item successfully.",
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the item.');
    }
  };

module.exports = { getAll, getSingle, createItem, updateItem, deleteItem };