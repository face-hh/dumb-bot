module.exports = {
    name: 'hello',
    aliases: ['hi'],
    run: async function(pepe, message, args, util) {
        message.reply(this.name)
    }
}