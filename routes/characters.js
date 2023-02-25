const express = require('express');
var router = express.Router();
const characterController = require('../controllers/character');
// const validation = require('../validation');
// const {check} = require('express-validator');

router.get('/', characterController.getAll);

router.get('/:id', characterController.getSingle);

router.post('/', characterController.createCharacter);

router.put('/:id', characterController.updateCharacter);

router.delete('/:id', characterController.deleteCharacter);

module.exports = router;