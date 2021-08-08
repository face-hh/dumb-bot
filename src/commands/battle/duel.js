const { MessageEmbed, MessageAttachment } = require('discord.js');
module.exports = {
	name: 'duel',
	aliases: [],
	category: 'battle',
	description: 'Duel with someone in Discord!',
	disabled: false,
	ownersOnly: false,
	cooldown: 10000,
	expectedArgs: [['user', 'required']],
	run: async function(pepe, message, args) {

		const mentioned = message.mentions.users.first() || pepe.users.cache.get(args[0]);

		if (!mentioned) return message.channel.send('Mention a user or get friends lmao..');

		const mentionedUser = await pepe.database.getData(mentioned.id);
		const user = await pepe.database.getData(message.author.id);

		const { createCanvas, registerFont } = require('canvas');

		registerFont('McFont.otf', { family: 'minecraft' });

		const canvas = createCanvas(970, 546);

		const ctx = canvas.getContext('2d');

		const gameData = [
			{
				memer: mentionedUser.Hero,
				healthMax: mentionedUser.HeroHP,
				healthNow: mentionedUser.HeroHP,
				shield: mentionedUser.HeroShield,
			},
			{
				memer: user.Hero,
				healthMax: user.HeroHP,
				healthNow: user.HeroHP,
				shield: user.HeroShield,
			},
		];
		// Player One
		// Max
		ctx.beginPath();
		ctx.rect(38, 418, 276, 74);
		ctx.fillStyle = '#060707';
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		// Min
		ctx.beginPath();
		ctx.rect(38, 418, gameData[1].healthNow * 276 / gameData[1].healthMax, 74);
		ctx.fillStyle = '#419656';
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		// Text
		ctx.beginPath();
		ctx.font = '70px "minecraft"';
		ctx.fillStyle = '#A4A6A5';
		ctx.textAllign = 'start';
		ctx.fillText(`${gameData[1].healthNow}/${gameData[1].healthMax}`, 90, 478);
		ctx.stroke();
		ctx.closePath();

		// Player Two
		// Max
		ctx.beginPath();
		ctx.rect(681, 413, 276, 74);
		ctx.fillStyle = '#060707';
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		// Min
		ctx.beginPath();
		ctx.rect(681, 413, gameData[0].healthNow * 276 / gameData[0].healthMax, 74);
		ctx.fillStyle = '#419656';
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		// Text
		ctx.beginPath();
		ctx.font = '70px "minecraft"';
		ctx.fillStyle = '#A4A6A5';
		ctx.textAllign = 'start';
		ctx.fillText(`${gameData[0].healthNow}/${gameData[0].healthMax}`, 734, 478);
		ctx.stroke();
		ctx.closePath();

		const embed = new MessageEmbed()
			.attachFiles(new MessageAttachment(canvas.toBuffer(), 'pog.png'))
			.setDescription(`_ _                     ${message.author.username}   **vs**   ${mentioned.username}                     _ _`)
			.setImage('attachment://pog.png');
		const { MessageButton, MessageActionRow } = require('discord-buttons');

		const btn = new MessageButton().setID('lol').setEmoji('873937540250484788').setStyle('grey').setLabel('Blade Hit');
		const btn2 = new MessageButton().setID('lol').setEmoji('873941370568605736').setStyle('red').setLabel('Punch');
		const btn3 = new MessageButton().setID('lol').setEmoji('873943896110039120').setStyle('blurple').setLabel('Defend');
		const btn4 = new MessageButton().setID('lol').setEmoji('873944679022997565').setStyle('green').setLabel('Run');

		const row = new MessageActionRow().addComponent(btn).addComponent(btn2).addComponent(btn3).addComponent(btn4);
		message.channel.send({ embed: embed, component: row });
	},
};