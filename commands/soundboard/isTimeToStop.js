const Discord = require('discord.js');
const path = require('path');
const checkifalreadyplaying = new Discord.Collection();
module.exports = {
    name: 'timestop',
    description: 'timestop sound board',
    run: async (client, message, args,) => {
        const channel = message.member.voice.channel;
        if (!channel) return message.channel.send('Please connect to a voice channel to use soundboard');
        channel.join().then(async connection => {
            const dispatcher = connection.play("https://cdn.discordapp.com/attachments/851287450037911572/872466285018112060/Its_Time_to_Stop_Meme_Sound_-_Sound_Effect_for_editing_mp3cut.net.mp3");
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