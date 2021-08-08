const Discord = require('discord.js')
const prefix = 'dum '
const utils = require('../utility/utils')
module.exports = async (pepe, message) => {

    if (message.author.bot || !message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const requiredCommand = args.shift().toLowerCase()

    const command = pepe.commands.get(requiredCommand)

    if (!command) return;

    try {
        command.run(pepe, message, args, utils)
    } catch (error) {
        message.channel.send('Hmm error appeared :rolling_eyes:\n```md\n# ' + error + '```')
        console.log(error)
    }
}