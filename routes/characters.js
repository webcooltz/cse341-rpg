const express = require('express');
var router = express.Router();

const characterController = require('../controllers/character');

// CREATE
router.post('/', characterController.createCharacter);

// READ (all)
router.get('/', characterController.getAll);

// READ (one)
router.get('/:id', characterController.getSingle);

// UPDATE
router.put('/:id', characterController.updateCharacter);

// DELETE
router.delete('/:id', characterController.deleteCharacter);

module.exports = router;