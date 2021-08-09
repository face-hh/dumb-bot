/* eslint-disable valid-typeof */
const mongoose = require('mongoose');
const battleDB = require('../models/battle');

mongoose.set('useFindAndModify', false);

module.exports = {
	/**
	 * @param {string} uri - The mongoose uri to connect
	*/
	async connect(uri) {
		if (!uri) throw new Error('The mongoose uri was not specified in the connect process.');
		mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	},
	/**
	 * @param {string} id - The id used to find the user's data
	*/
	async getData(id) {
		const extractedData = await battleDB.findOne({ UserID: id });

		if (!extractedData || typeof extractedData == null) {
			const newBattle = new battleDB({ UserID: id }).save();
			return newBattle;
		}
		else {
			console.log(extractedData);
			return extractedData;
		}
	},
};