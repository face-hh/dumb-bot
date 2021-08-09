const { getAudioUrl } = require('google-tts-api');

module.exports = {
	name: 'tts',
	category: 'soundboard',
	aliases: [],
	disabled: false,
	ownersOnly: false,
	cooldown: 10000,
	expectedArgs: [],
	run: async (_client, message, args) => {

		if (!args[0]) return message.channel.send('Am i just dumb or you want me to say nothing?');

		const string = args.join(' ');
		if (string.length > 200) return message.channel.send('Im not google to say more than 200 words bro');

		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.channel.send('How could i play if you are not even in vc');

		const audioURL = await getAudioUrl(string, {
			lang: 'en',
			slow: false,
			host: 'https://translate.google.com',
		});

		const connection = await voiceChannel.join();
		const dispatcher = connection.play(audioURL);
		message.react('🔉');

		try {
			voiceChannel.join().then(() => {
				dispatcher.on('finish', () => {
					voiceChannel.leave();
				});
				dispatcher.on('error', () => {
					voiceChannel.leave();
				});
			});
		}
		catch (e) {
			message.channel.send('Some error appeared here try again after uwu');
			console.error(e);
		}
	},
};