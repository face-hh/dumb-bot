/* eslint-disable no-unused-vars */
const { MessageEmbed, MessageCollector } = require('discord.js');
const Schema = require('../../models/chat-bot');
const { MessageButton } = require('discord-buttons');
module.exports = {
	name: 'setchatbot',
	aliases: ['setchat'],
	category: 'config',
	description: 'Set the chat bot channel for the server!',
	disabled: false,
	ownersOnly: false,
	cooldown: 20 * 1000,
	expectedArgs: [],
	run: async function(pepe, message, args, util) {
		
		const noPermEmbed = new MessageEmbed()
			.setDescription(':x: | You need `MANAGE_SERVER` permission to run this command')
			.setColor("RED")

		if (!message.member.permissions.has('MANAGE_GUILD')) {
			return message.channel.send(noPermEmbed);
		}
		
		const filter = m => m.author.id === message.author.id;

		const collector = new MessageCollector(message.channel, filter, { max: 1 });

		await Schema.findOne({ guildID: message.guild.id }, async (err, data) => {
			if (data) {
				const button1 = new MessageButton()
					.setLabel('Yes')
					.setStyle('green')
					.setID('yes');

				const button2 = new MessageButton()
					.setLabel('No')
					.setStyle('red')
					.setID('no');

				const alreadyDataEmbed = new MessageEmbed()
					.setDescription(`${message.guild.name} already has a chat bot channel set to ${message.guild.channels.cache.get(data.channelID).toString()}, would you like to change it?`);

				const embed = await message.channel.send({
					buttons: [button1, button2],
					embed: alreadyDataEmbed,
				});


				const Buttonfilter = (button) => button.clicker.user.id === message.author.id;
				const buttonCollector = embed.createButtonCollector(Buttonfilter, { time: 30000 });


				buttonCollector.on('collect', async (b) => {
					b.reply.defer();

					if (b.id == 'no') {
						const noOptionEmbed = new MessageEmbed()
							.setDescription('Cancled process!')
							.setColor('GREEN');

						await embed.delete();
						message.channel.send(noOptionEmbed);
						buttonCollector.stop();
						return;

					}
					else if (b.id == 'yes') {
						const secondCollector = new MessageCollector(message.channel, filter, { max: 1 });
						await message.channel.send('Please mention a channel to set the chat bot too!');
						secondCollector.on('collect', async msg => {
							await embed.delete();
							const channel = msg.mentions.channels.first();
							if (!channel) {
								msg.channel.send('That is not a valid channel! Please try again');
								secondCollector.stop();
								return;
							}
							const sucessEmbed = new MessageEmbed()
								.setDescription(`Changed chatbot channel from ${message.guild.channels.cache.get(data.channelID).toString()} to ${channel}`)
								.setColor('GREEN');
							await data.delete();
							new Schema({
								guildID: msg.guild.id,
								channelID: channel.id,
							}).save();
							message.channel.send(sucessEmbed);
							secondCollector.stop();
							buttonCollector.stop();
							return;
						});
					}
				});

				setTimeout(() => {
					const b1 = button1.setDisabled();
					const b2 = button2.setDisabled();
					embed.edit({
						content: 'Time has expired, please try again!',
						embed: alreadyDataEmbed,
						buttons: [b1, b2],
					});
				}, 30000);
			}
			else {
				const mentionChannelEmbed = new MessageEmbed()
					.setDescription('Please mention a channel for the chat bot to be set!')
					.setColor('RANDOM');

				await message.channel.send(mentionChannelEmbed);

				collector.on('collect', async msg => {
					const channel = msg.mentions.channels.first();
					if (!channel) {
						msg.channel.send('That is not a valid channel! Please try again');
						collector.stop();
						return;
					}

					new Schema({
						guildID: msg.guild.id,
						channelID: channel.id,
					}).save();

					const successEmbed = new MessageEmbed()
						.setDescription(`Set chat bot channel to ${channel}!`)
						.setColor('GREEN');

					msg.channel.send(successEmbed);
					collector.stop();
					return;
				});
			}
		});
	},
};
