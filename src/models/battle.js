const { Schema, model } = require('mongoose');

module.exports = model('battle', Schema({
	UserID: { type: String, required: true },
}));