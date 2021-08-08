const util = require('../utility/utils');
module.exports = async (pepe, message) => {

	if (message.author.bot || !message.guild) {
		return;
	}
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
  
	try {
		cmd.run(pepe, message, args, util);
	}
	catch (error) {
		message.channel.send('Hmm error appeared :rolling_eyes:\n```md\n# ' + error + '```');
		console.log(error);
	}
};
