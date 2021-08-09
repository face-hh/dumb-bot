const { createCanvas, registerFont } = require('canvas');

module.exports.pepes = [
	{
		realName: 'Susge',
		names: ['pepesus', 'susge', 'sussy', 'sus'],
		URL1: 'https://cdn.discordapp.com/attachments/873617811824599100/874233936908259338/869749625807048765_2.png',
		URL2: 'https://cdn.discordapp.com/attachments/873617811824599100/874234048564826112/869749625807048765_3.png',
		emoji: '874229992840659024',
		PepeHP: 20,
		PepeShield: 5,
	},
	{
		realName: 'Madge',
		names: ['pepemad', 'madge', 'mad'],
		URL1: 'https://cdn.discordapp.com/attachments/873617811824599100/874233656766504990/855108061526098021_2.png',
		URL2: 'https://cdn.discordapp.com/attachments/873617811824599100/874233693147918416/855108061526098021_3.png',
		emoji: '874230505548181564',
		PepeHP: 15,
		PepeShield: 9,
	},
	{
		realName: 'Sadge',
		names: ['pepesad', 'sadge', 'sad'],
		URL1: 'https://cdn.discordapp.com/attachments/873617811824599100/874234288550322176/855108093343301660_2.png',
		URL2: 'https://cdn.discordapp.com/attachments/873617811824599100/874234187396292608/855108093343301660_1.png',
		emoji: '874232236457742366',
		PepeHP: 10,
		PepeShield: 10,
	},
	{
		realName: 'Prayge',
		names: ['pepepray', 'prayge', 'pray'],
		URL1: 'https://cdn.discordapp.com/attachments/873617811824599100/874233500138635274/765858161357357116_1.png',
		URL2: 'https://cdn.discordapp.com/attachments/873617811824599100/874233337726779412/765858161357357116.png',
		emoji: '874232289159155763',
		PepeHP: 5,
		PepeShield: 15,
	},
];
<<<<<<< Updated upstream
=======

module.exports.utility = {
	async displayBattleScreen(gameData, collector) {
		collector.stop();

		if (!gameData) return new Error('Missing \'gameData\' in the displayBattleScreen function.');
		registerFont('McFont.otf', { family: 'minecraft' });

		const canvas = createCanvas(970, 546);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(gameData[0].icon, 36, 92, 299, 299);
		ctx.drawImage(gameData[1].icon, 646, 92, 299, 299);

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
		// Shield
		// color fill
		ctx.beginPath();
		ctx.rect(74, 490, 197, 52);
		ctx.fillStyle = '#000835';
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		// Min
		ctx.beginPath();
		ctx.rect(74, 490, gameData[1].shieldNow * 197 / gameData[1].shieldMax, 52);
		ctx.fillStyle = '#001DBF';
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		// Text
		ctx.beginPath();
		ctx.font = '65px "minecraft"';
		ctx.fillStyle = '#A4A6A5';
		ctx.textAllign = 'start';
		ctx.fillText(`${gameData[1].shieldNow}/${gameData[1].shieldMax}`, 82, 538);
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
		// Shield
		// color fill
		ctx.beginPath();
		ctx.rect(718, 490, 197, 52);
		ctx.fillStyle = '#000835';
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		// Min
		ctx.beginPath();
		ctx.rect(718, 490, gameData[0].shieldNow * 197 / gameData[0].shieldMax, 52);
		ctx.fillStyle = '#001DBF';
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		// Text
		ctx.beginPath();
		ctx.font = '65px "minecraft"';
		ctx.fillStyle = '#A4A6A5';
		ctx.textAllign = 'start';
		ctx.fillText(`${gameData[0].shieldNow}/${gameData[0].shieldMax}`, 734, 538);
		ctx.stroke();
		ctx.closePath();
		return canvas.toBuffer();
	},
};
>>>>>>> Stashed changes
