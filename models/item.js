var mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    // 1: Common, 2: uncommon, 3: rare, 4: epic, 5: legendary
    rarity: { type: Number, required: true },
    amount: { type: Number, required: true }
});

module.exports = mongoose.model('Item', itemSchema);