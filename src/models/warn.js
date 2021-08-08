const { Schema, model } = require('mongoose');

module.exports = model('warnings', Schema({
	guildID: { type: String, required: true },
    userID: { type: String, required: true },
    warnings: { type: Number, required: true },
}));
