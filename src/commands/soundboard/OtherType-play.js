const Discord = require('discord.js');
const fs = require('fs');
const checkifalreadyplaying = new Discord.Collection();
module.exports = {
    name: 'play',
    aliases: [],
    category: 'soundboard',
    description: 'play the recorded sound',
    disabled: false,
    ownersOnly: false,
    cooldown: 10000,
    expectedArgs: [],
    run: async function (pepe, message, args, util) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('Please connect to a voice channel to play your recorded voice!');

        if(!fs.existsSync(`./recorded-${message.author.id}.pcm`)) return message.channel.send('Sorry dude, Your Voice is **NOT** Recorded!');

        const connection = await message.member.voice.channel.join();
        const stream = fs.createReadStream(`./recorded-${message.author.id}.pcm`);

        const dispatcher = connection.play(stream, {
            type: "converted"
        });

        dispatcher.on("finish", () => {
            message.member.voice.channel.leave();
            return message.channel.send("Finished Playing The Voice Audio!\nGonna leave now..Bye.");
        })
        
    }
}
