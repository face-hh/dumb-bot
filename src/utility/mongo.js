const mongoose = require('mongoose');
const battleDB = require('../models/battle');
const caseDB = require('../models/case')
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
			useFindAndModify: false,
			autoIndex: false
		});
	},
	/**
	 * @param {string} id - The id used to find the user's data
	 */
	async getData(id) {
		await battleDB.findOne({
			UserID: id
		}).lean().exec().then(async (extractedData) => {
			if (!extractedData) {
				const newBattle = new battleDB({
					UserID: id
				});
				const {
					UserID,
				} = newBattle;
				await newBattle.save().catch((err) => {
					console.log(err);
				});
				return {
					UserID,
				};
			} else {
				const {
					UserID,
				} = extractedData;
				return {
					UserID,
				};
			}
		});
	},

	async getCase(guildID) {
		if (!guildID) {
			throw new Error("Provide guild ID for GetCase function")
		}
		const data = await caseDB.findOne({
			guildID: guildID
		})
		if (!data) {
			return false;
		} else {
			return data.case;
		}
	}
};
