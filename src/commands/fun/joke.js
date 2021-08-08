/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: 'joke',
	aliases: [],
	category: 'fun',
	description: 'Gives you a random joke',
	disabled: false,
	ownersOnly: false,
	cooldown: 0,
	expectedArgs: [],
	run: async function(pepe, message, args, util) {
		try {
			const data = await fetch('https://official-joke-api.appspot.com/random_joke').then(res => res.json());
			const joke = data.setup;
			const answer = data.punchline;

			return message.reply(
				new MessageEmbed()
					.setTitle('Here\'s a joke!')
					.setDescription(`${joke}\n\n||${answer}||`)
					.setColor('RANDOM'),
			);
		}
		catch (err) {
			message.channel.send('Couldn\'t find a joke.. Maybe try again?');
		}
	},
};