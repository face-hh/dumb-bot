const { MessageEmbed, MessageAttachment } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const { loadImage } = require('canvas');

module.exports = {
	name: 'duel',
	aliases: [],
	category: 'battle',
	description: 'Duel with someone in Discord!',
	disabled: false,
	ownersOnly: false,
	cooldown: 10000,
	expectedArgs: [['user', 'required']],
	run: async function(pepe, message, args, utils) {

		const mentioned = message.mentions.users.first() || pepe.users.cache.get(args[0]);

		if (!mentioned) return message.channel.send('Mention a user or get friends lmao..');

		// Buttons and rows
		const row = new MessageActionRow();
		const row2 = new MessageActionRow();
		const row3 = new MessageActionRow();
		const btn = new MessageButton().setID('lol').setEmoji('873937540250484788').setStyle('grey').setLabel('Blade Hit');
		const btn2 = new MessageButton().setID('lol').setEmoji('873941370568605736').setStyle('red').setLabel('Punch');
		const btn3 = new MessageButton().setID('lol').setEmoji('873943896110039120').setStyle('blurple').setLabel('Defend');
		const btn4 = new MessageButton().setID('lol').setEmoji('873944679022997565').setStyle('green').setLabel('Run');

		// Data
		const battle_data = require('../../utility/battle_data');
		const clickedUsers = [];
		const gameData = [];

		battle_data.pepes.forEach((obj) => {
			if (row.components.length < 5) {
				row.addComponent(
					new MessageButton()
						.setEmoji(obj.emoji)
						.setLabel(obj.realName)
						.setID(obj.names[0])
						.setStyle('green'),
				);
			}
			else if (row2.components.length > 5) {
				row2.addComponent(
					new MessageButton()
						.setEmoji(obj.emoji)
						.setLabel(obj.realName)
						.setID(obj.names[0])
						.setStyle('green'),
				);
			}
			else if (row3.components.length > 5) {
				row3.addComponent(
					new MessageButton()
						.setEmoji(obj.emoji)
						.setLabel(obj.realName)
						.setID(obj.names[0])
						.setStyle('green'),
				);
			}
		});
		const rows = { components: [] };
		rows.components.push(row);
		if (row2.components.length > 5) rows.components.push(row2);
		if (row3.components.length > 5) rows.components.push(row3);

		message.channel.send('Choose your pepe!', rows).then((msg) => {
			let i = 0;
			const collector = msg.createButtonCollector(b => b.clicker.user.id == message.author.id || b.clicker.user.id == mentioned.id);

			collector.on('collect', async button => {
				button.reply.defer();
				if (clickedUsers.includes(button.clicker.user.id)) return;
				clickedUsers.push(button.clicker.user.id);
				i++;


				const foundData = battle_data.pepes.find((x) => x.names.includes(button.id));

				gameData.push({
					memer: foundData.realName,
					healthMax: foundData.PepeHP,
					healthNow: foundData.PepeHP,
					shield: foundData.PepeShield,
					icon: await loadImage(foundData[`URL${i}`]),
<<<<<<< Updated upstream
				})
				console.log(gameData)

				if (gameData.length == 2) startTheGame()
=======
				});
				if (gameData.length == 2) startTheGame();
>>>>>>> Stashed changes

				// Getting and disabling the button
				rows.components.forEach(async (messagec) => {
					const ccac = await messagec.components.find((x) => x.custom_id == button.id);
					ccac.disabled = true;
					ccac.style = 'red';
					msg.edit('Choose your pepe!', rows);
				});

			});

			async function startTheGame() {
<<<<<<< Updated upstream
				collector.stop()
				msg.delete()
				registerFont('McFont.otf', { family: 'minecraft' });


				const canvas = createCanvas(970, 546);
				console.log(gameData)
				const ctx = canvas.getContext('2d')
				ctx.drawImage(gameData[0].icon, 36, 92, 299, 299)
				ctx.drawImage(gameData[1].icon, 646, 92, 299, 299)

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
=======
				const canvas = await utils.displayBattleScreen(gameData, collector);
>>>>>>> Stashed changes

				const embed = new MessageEmbed()
					.attachFiles(new MessageAttachment(canvas, 'pog.png'))
					.setDescription(`${message.author.username}   **vs**   ${mentioned.username}`)
					.setImage('attachment://pog.png');

				const row4 = new MessageActionRow()
					.addComponent(btn)
					.addComponent(btn2)
					.addComponent(btn3)
					.addComponent(btn4);
				return message.channel.send({ embed: embed, component: row4 });
			}
		});
	},
};