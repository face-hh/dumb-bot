const Discord = require('discord.js');
const path = require('path');
const checkifalreadyplaying = new Discord.Collection();
module.exports = {
    name: 'scatman',
    aliases: [],
    category: 'fun',
    description: 'scatman sound board',
    disabled: false,
    ownersOnly: false,
    cooldown: 10000,
    expectedArgs: [],
    run: async function (pepe, message, args, util) {
        const channel = message.member.voice.channel;
        if (!channel) return message.channel.send('Please connect to a voice channel to use soundboard');
        channel.join().then(async connection => {
            const dispatcher = connection.play("https://cdn.discordapp.com/attachments/736047049199321109/872297761960255558/Scatman_Animation_mp3cut.net.mp3");
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