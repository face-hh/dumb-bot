const { Schema, model } = require('mongoose');

module.exports = model('battle', Schema({
	UserID: { type: String, required: true },
	Hero: { type: String, default: 'Madge' },
	HeroHP: { type: Number, default: 100 },
	HeroShield: { type: Number, default: 40 },
}));