const util = require('../utility/utils');
const chatDB = require('../models/chat-bot');
const fetch = require('node-fetch');
module.exports = async (pepe, message) => {

	if (message.author.bot || !message.guild) {
		return;
	}

	await chatDB.findOne({ guildID: message.guild.id }, async (err, data) => {
		if (!data) return;
		if (message.channel.id !== data.channelID) return;
		fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}&key=${process.env.monkeDev}`)
			.then(response => response.json())
			.then(fetchData => {
				message.reply(fetchData.response);
			});
	});

	let prefix;

	const mentionRegex = message.content.match(new RegExp(`^<@!?(${pepe.user.id})>`, 'gi'));

	if (mentionRegex) {
		prefix = `${mentionRegex[0]} `;
	}
	else {
		prefix = util.prefix;
	}

	if (message.content.indexOf(prefix) !== 0) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = pepe.commands.get(command) || pepe.commands.find((cmds) => cmds.aliases && cmds.aliases.includes(command));
	if (!cmd) return;

	try {
		cmd.run(pepe, message, args, util);
	}
	catch (error) {
		message.channel.send('Hmm error appeared :rolling_eyes:\n```md\n# ' + error + '```');
		console.log(error);
	}
};
