const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
module.exports = {
	name: 'help',
	aliases: [],
	category: 'utility',
	description: 'Get help with the bot!',
	disabled: false,
	ownersOnly: false,
	cooldown: 10000,
	expectedArgs: [['command', 'optional']],
	run: async function(pepe, message, args, util) {
		if (!args[0]) {
			message.reply(
				new MessageEmbed()
					.setTitle('Hello g')
					.addField('Fun', '`dum help fun`')
					.setThumbnail(pepe.user.displayAvatarURL({ format: 'png' }))
					.setTimestamp()
					.setFooter('Ma prefix is dum by da way'),
			);
		}
		else if (pepe.commands.has(args[0])) {
			const cmd = pepe.commands.get(args[0]);

			return message.channel.send('```cs\n' +
				'# Description\n' + '> ' + cmd.description + '\n' +
				'# Aliases\n' + '> ' + (cmd.aliases !== [] ? 'nothing...' : cmd.aliases.join(' T ')) + '\n' +
				'# Category\n' + '> ' + cmd.category + '\n' +
				'# Disabled\n' + '> ' + cmd.disabled + '\n' + '\n```');
		}
		else {
			const categoryArray = readdirSync('./src/commands/');
			const category = categoryArray.filter(x => x === args[0].toLowerCase()).join('');

			if (!category) return message.reply('I can\'t find this!');
			console.log(category.toLowerCase());
			const cmds = pepe.commands.filter(x => x.category.toLowerCase() === category.toLowerCase()).map(cmd => `\`${cmd.name}\``).join(' T ');
			const cmdsEmbed = new MessageEmbed()
				.setTitle(`${category.slice(0, 1).toUpperCase()}${category.slice(1)}`)
				.setDescription('Invite me [g](' + util.invite + ')\n\n' + cmds)
				.setThumbnail(pepe.user.avatarURL({ type: 'png' }))
				.setColor('RANDOM');
			return message.reply({ embed: cmdsEmbed });
		}
	},
};