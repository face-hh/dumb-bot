module.exports = {
	name: 'wushbottle',
	description: 'wushbottle sound board',
	category: 'soundboard',
	aliases: [],
	disabled: false,
	ownersOnly: false,
	cooldown: 10000,
	expectedArgs: [],
	run: async (_client, message) => {
		const channel = message.member.voice.channel;
		if (!channel) return message.channel.send('Please connect to a voice channel to use soundboard');
		channel.join().then(async connection => {
			const dispatcher = connection.play('https://cdn.discordapp.com/attachments/851287403456626717/873902070225321994/6990834976849775878_no_watermark1_mp3cut.net.mp3');
			const e = await message.react('🎙️');
			dispatcher.on('speaking', speaking => {
				if (!speaking) {
					channel.leave();
					e.remove();
				}
			});
		}).catch(err => console.log(err));
	},
};