var mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: false },
    rarity: { type: String, required: true },
    amount: { type: Number, required: true }
});

module.exports = mongoose.model('Item', itemSchema);