module.exports = {
	name: 'destroy',
	description: 'destroy sound board',
	aliases: [],
	category: 'soundboard',
	disabled: false,
	ownersOnly: false,
	cooldown: 10000,
	expectedArgs: [],
	run: async (_client, message) => {
		const channel = message.member.voice.channel;
		if (!channel) return message.channel.send('Please connect to a voice channel to use soundboard');
		channel.join().then(async connection => {
			const dispatcher = connection.play('https://cdn.discordapp.com/attachments/873617811824599100/873856627688738836/Destruction_Earthquake_Sound_Effects_mp3cut.net.mp3');
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