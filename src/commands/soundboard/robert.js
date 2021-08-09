module.exports = {
	name: 'robert',
	aliases: [],
	category: 'soundboard',
	description: 'robert sound board',
	disabled: false,
	ownersOnly: false,
	cooldown: 10000,
	expectedArgs: [],
	run: async function(pepe, message) {
		const channel = message.member.voice.channel;
		if (!channel) return message.channel.send('Please connect to a voice channel to use soundboard');
		channel.join().then(async connection => {
			const dispatcher = connection.play('https://cdn.discordapp.com/attachments/736047049199321109/872294924333240410/Popular_Meme_Sound_Effects_2_HD_mp3cut.net.mp3');
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