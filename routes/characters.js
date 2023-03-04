const express = require('express');
const router = express.Router();
const characterController = require('../controllers/character');
const isAuth = require("../util/authToken");

router.get('/', isAuth, characterController.getAll);

router.get('/:id', characterController.getSingle);

router.post('/', characterController.createCharacter);

router.put('/:id', characterController.updateCharacter);

router.delete('/:id', characterController.deleteCharacter);

module.exports = router;