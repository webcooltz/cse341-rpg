const express = require('express');
var router = express.Router();

const itemController = require('../controllers/item');

// CREATE
router.post('/', itemController.createItem);

// READ (all)
router.get('/', itemController.getAll);

// READ (one)
router.get('/:id', itemController.getSingle);

// UPDATE
router.put('/:id', itemController.updateItem);

// DELETE
router.delete('/:id', itemController.deleteItem);

module.exports = router;