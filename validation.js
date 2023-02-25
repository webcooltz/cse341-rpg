// const { body, validationResult } = require('express-validator');
const {check, validationResult} = require('express-validator');
 
exports.characterValidation = [
    check('charName', 'Character name is required').not().isEmpty(),
    check('level', 'Level must be int 1-70').not().isEmpty().isInt({ min: 1, max: 70 }),
    check('money', 'Money is int with minimum 0 and maximum 9999').not().isEmpty().isInt({ min: 0, max: 9999 }),
    check('owner', 'Owner is required').not().isEmpty()
]
 
exports.itemValidation = [
    check('name', 'Item name is required').not().isEmpty(),
    check('level', 'Item level must be int 1-70').not().isEmpty().isInt({ min: 1, max: 70 }),
    check('rarity', '1: Common, 2: uncommon, 3: rare, 4: epic, 5: legendary').not().isEmpty().isInt({ min: 1, max: 5 }),
    check('amount', 'Amount must be between 1 and 99').not().isEmpty().isInt({ min: 1, max: 99 }),
]