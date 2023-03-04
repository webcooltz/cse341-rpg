const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const User = require('../models/user');
const passwordUtil = require('../util/passwordValidation');
const schemaValidator = require('../util/userValidation');

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('users').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('users').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createUser = async (req, res) => {
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (!req.body) {
        res.status(400).send({ message: "Request body error" });
        return;
    } else if (passwordCheck.error) {
        res.status(400).send({ message: passwordCheck.error });
        return;
    }
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    const schemaResponse = schemaValidator.validate(user);
    if (schemaResponse.error) {
        res.status(400).send({ message: schemaResponse.error.details[0].message });
        return;
    }
    const response = await mongodb.getDb().db().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json({
        response: response,
        message: "Created new User successfully.",
        user: user
      });
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};
  
  const updateUser = async (req, res) => {
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (!req.body) {
        res.status(400).send({ message: "Request body error" });
        return;
    } else if (passwordCheck.error) {
        res.status(400).send({ message: passwordCheck.error });
        return;
    }
    const userId = new ObjectId(req.params.id);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    const schemaResponse = schemaValidator.validate(user);
    if (schemaResponse.error) {
        res.status(400).send({ message: schemaResponse.error.details[0].message });
        return;
    }
    const response = await mongodb
        .getDb()
        .db()
        .collection('users')
        .replaceOne({ _id: userId }, { user });
    console.log(response);
    if (response.modifiedCount > 0) {
    res.status(204).json({
        response: response,
        message: "Updated user successfully.",
        user: user
    });
    } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
  };
  
  const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).json({
        response: response,
        message: "Deleted user successfully.",
      });
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
  };

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };