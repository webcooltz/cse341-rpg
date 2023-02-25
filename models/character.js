const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
    charName: { type: String, required: true },
    level: { type: Number, required: false },
    money: { type: Number, required: false },
    createdAt: { type: String, required: false },
    lastPlayed: { type: String, required: false },
    owner: { type: String, required: true },
    location: { type: String, required: false }
});

module.exports = mongoose.model('Character', characterSchema);