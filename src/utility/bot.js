const { Collection, Client } = require('discord.js');
const chalk = require('chalk');
const mongo = require('../utility/mongo');

class Bot extends Client {
	constructor(options) {
		super(options);

		this.commands = new Collection;
		this.aliases = new Collection;
		this.events = new Collection;
		this.cooldowns = new Collection;
		this.database = mongo;

	}

	start(token) {
		require('./reply');
		require('discord-buttons')(this);
		require('./configuration')(this);

		this.database.connect(process.env.mongo).then(() => {
			console.log(chalk.green('Connected to MongoDB!'));
		});

		this.login(token);
	}
}

module.exports = Bot;