const { Schema, model } = require('mongoose');

module.exports = model('chat-bot', Schema({
	guildID: { type: String, required: true },
	channelID: { type: String, required: true },
}));