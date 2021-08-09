const {
    MessageEmbed
} = require("discord.js")
const Schema = require('../../models/warn')
const { MessageButton } = require("discord-buttons")
module.exports = {
    name: 'warnings',
    aliases: ["view-warn", "view"],
    category: 'mod',
    description: 'view the number of warnings for a user and remove them!',
    disabled: false,
    ownersOnly: false,
    cooldown: 4 * 1000,
    expectedArgs: [],
    run: async function (pepe, message, args, util) {


    }

}