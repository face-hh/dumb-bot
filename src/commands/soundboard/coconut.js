const Discord = require('discord.js');
const path = require('path');
const checkifalreadyplaying = new Discord.Collection();
module.exports = {
    name: 'coconut',
    aliases: [],
    category: 'soundboard',
    description: 'coconut sound board',
    disabled: false,
    ownersOnly: false,
    cooldown: 10000,
    expectedArgs: [],
    run: async function (pepe, message, args, util) {
        const channel = message.member.voice.channel;
        if (!channel) return message.channel.send('Please connect to a voice channel to use soundboard');
        channel.join().then(async connection => {
            const dispatcher = connection.play("https://cdn.discordapp.com/attachments/873617811824599100/873854908875554866/The_Coconut_Song_-_Da_Coconut_Nut_mp3cut.net.mp3");
            const e = await message.react('🎙️');
            dispatcher.on('speaking', speaking => {
                if (!speaking) {
                    channel.leave();
                    e.remove()
                }
            });
        }).catch(err => console.log(err));
    }
}
