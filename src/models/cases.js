const { Schema, model } = require('mongoose');

module.exports = model('cases', Schema({
    guildID: { type: String, required: true },
    caseID: { type: Number, required: true },
}));
