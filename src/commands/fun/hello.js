module.exports = {
    name: 'hello',
    aliases: ['hi'],
    run: async function(client, message, args, util) {
        message.reply(this.name)
    }
}