const express = require('express');
var router = express.Router();
const characterController = require('../controllers/character');

router.get('/', characterController.getAll);

router.get('/:id', characterController.getSingle);

router.post('/', characterController.createCharacter);

router.put('/:id', characterController.updateCharacter);

router.delete('/:id', characterController.deleteCharacter);

module.exports = router;