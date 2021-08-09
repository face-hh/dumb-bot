const util = require('../utility/utils');
const chatDB = require('../models/chat-bot');
const fetch = require('node-fetch');
module.exports = async (pepe, message) => {

	if (message.author.bot || !message.guild) {
		return;
	}

	await chatDB.findOne({
		guildID: message.guild.id
	}, async (err, data) => {
		if (!data) return;
		if (message.channel.id !== data.channelID) return;
		try {
			const fetched = await fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${encodeURIComponent('Dumb Bot')}&ownername=${encodeURIComponent('some people lol')}&user=${encodeURIComponent(message.author.id)}`, {});
			const response = await fetched.json();
			message.reply(response.message);
		} catch (e) {
			message.reply('Something went wrong while fetching!');
			console.log(e);
		}
	});

	let prefix;

	const mentionRegex = message.content.match(new RegExp(`^<@!?(${pepe.user.id})>`, 'gi'));

	mentionRegex ? prefix = `${mentionRegex[0]} ` : prefix = util.prefix;

	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = pepe.commands.get(command) || pepe.commands.find((_cmd) => _cmd.aliases && _cmd.aliases.includes(command));
	if (!cmd) return;

	const {
		cooldowns
	} = pepe;


	if (!cooldowns.has(cmd.name)) {
		cooldowns.set(cmd.name, new Collection());
	}

	const time = cooldowns.get(cmd.name);
	let cooldownAmount = cmd.cooldown

	if (time.has(message.author.id)) {
		const expirationTime = time.get(message.author.id) + cooldownAmount;

		if (Date.now() < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel.send(new MessageEmbed().setDescription(`:x: | You are on cooldown for \`${util.prefix}${cmd.name}\`\nPlease wait \`\`${timeLeft.toFixed(1)} seconds\`\` before using **${cmd.name}** command again!`).setColor("RANDOM"))
		};
	}

	time.set(message.author.id, Date.now());
	setTimeout(() => time.delete(message.author.id), cooldownAmount);
	try {
		cmd.run(pepe, message, args, util);
	} catch (error) {
		message.channel.send('Hmm error appeared :rolling_eyes:\n```md\n# ' + error + '```');
		console.log(error);
	}
};
