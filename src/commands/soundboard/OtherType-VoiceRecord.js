const Discord = require('discord.js');
const fs = require('fs');
const checkifalreadyplaying = new Discord.Collection();
module.exports = {
    name: 'record',
    aliases: [],
    category: 'soundboard',
    description: 'record the sound',
    disabled: false,
    ownersOnly: false,
    cooldown: 10000,
    expectedArgs: [],
    run: async function (pepe, message, args, util) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('Please connect to a voice channel to record your voice!');

        const connection = await message.member.voice.channel.join();
        const receiver = connection.receiver.createStream(message.member, {
            mode: "pcm",
            end: "silence"
        });

        const writer = receiver.pipe(fs.createWriteStream(`./recorded-${message.author.id}.pcm`));
        writer.on("finish", () => {
            message.member.voice.channel.leave();
            message.channel.send("Finished Record Your Voice!\nType `dum play` to playback your recorded voice!");
        });
    }
}
