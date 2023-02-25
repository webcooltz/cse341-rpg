const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const Character = require('../models/character');
// const validation = require('../validation');

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('characters').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const charId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('characters').find({ _id: charId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createCharacter = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request body cannot be empty" });
    return;
  }
  // try {
    // const charNameCheck = validation.characterValidation(req.body);
    // if (charNameCheck.error) {
    //   res.status(400).send({ message: charNameCheck.error });
    //   return;
    // }
    const character = new Character({
      charName: req.body.charName,
      level: req.body.level,
      money: req.body.money,
      createdAt: req.body.createdAt,
      lastPlayed: req.body.lastPlayed,
      owner: req.body.owner,
      location: req.body.location
    });
    const response = await mongodb.getDb().db().collection('characters').insertOne(character);
    if (response.acknowledged) {
      res.status(201).json({
        response: response,
        message: "Created new Character successfully.",
        character: character
      });
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the character.');
    }
  // }
  // catch (err) {
  //   res.status(500).json(err);
  // }
};
  
  const updateCharacter = async (req, res) => {
    if (!req.body) {
      res.status(400).send({ message: "Request body cannot be empty" });
      return;
    }
    try {
      const charId = new ObjectId(req.params.id);
      const character = {
        charName: req.body.charName,
        level: req.body.level,
        money: req.body.money,
        createdAt: req.body.createdAt,
        lastPlayed: req.body.lastPlayed,
        owner: req.body.owner,
        location: req.body.location
      };
      const response = await mongodb
        .getDb()
        .db()
        .collection('characters')
        .replaceOne({ _id: charId }, character);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).json({
          response: response,
          message: "Updated character successfully.",
          character: character
        });
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the character.');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  const deleteCharacter = async (req, res) => {
    const charId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('characters').deleteOne({ _id: charId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).json({
        response: response,
        message: "Deleted character successfully.",
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the character.');
    }
  };

module.exports = { getAll, getSingle, createCharacter, updateCharacter, deleteCharacter };