const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'ping',
    aliases: ['pong'],
    category: 'utility',
    description: 'Get da ping of the bot in ms aka its movement!',
    disabled: false,
    ownersOnly: false,
    cooldown: 10000,
    expectedArgs: [],
    run: async function (pepe, message, args, util) {

        const msg = await message.channel.send("Pinging..");

        const apiLatency = pepe.ws.ping
        const botLatency = msg.createdTimestamp - message.createdTimestamp;
    
        msg.edit(`💻 API latency is \`${apiLatency}ms\`\n🖥️ Bot latency is \`${botLatency}ms\``);
    
    }
}