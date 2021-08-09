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
<<<<<<< Updated upstream
		fetch(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}&key=${process.env.monkeDev}`)
		  .then(response => response.json())
		  .then(data => {
			message.reply(data.response)
		  })
	  })

	let prefix;

	let mentionRegex = message.content.match(new RegExp(`^<@!?(${pepe.user.id})>`, 'gi'))
	if (mentionRegex) {
	  prefix = `${mentionRegex[0]} `
	} else {
	  prefix = util.prefix
	}
	
	if (message.content.indexOf(prefix) !== 0) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
  
	const cmd = pepe.commands.get(command) || pepe.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
	if (!cmd) return
  
=======
		try {
			const fetched = await fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${encodeURIComponent('Weky')}&ownername=${encodeURIComponent('Face')}&user=${encodeURIComponent(message.author.id)}`, {});
			const response = await fetched.json();
			message.reply(response.message);
		}
		catch (e) {
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

>>>>>>> Stashed changes
	try {
		cmd.run(pepe, message, args, util);
	}
	catch (error) {
		message.channel.send('Hmm error appeared :rolling_eyes:\n```md\n# ' + error + '```');
		console.log(error);
	}
};
