const { Schema, model } = require('mongoose');

module.exports = model('cases', Schema({
	guildID: { type: String, required: true },
    targetID: { type: String, required: true },
    moderatorID: { type: String, required: true },
    action: { type: String, required: true },
    reason: { type: String, required: true },
    case: { type: Number, required: true },
}));
