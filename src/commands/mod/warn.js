const {
    MessageEmbed
} = require("discord.js")
const Schema = require('../../models/warn')
module.exports = {
    name: 'warn',
    aliases: [],
    category: 'mod',
    description: 'warn a user!',
    disabled: false,
    ownersOnly: false,
    cooldown: 3 * 1000,
    expectedArgs: [],
    run: async function (pepe, message, args, util) {

        /*     	
        		const noPermEmbed = new MessageEmbed()
                .setDescription(':x: | You need `KICK_MEMBERS` permission to run this command')
                .setColor("RED")

            if (!message.member.permissions.has('KICK_MEMBERS')) {
                return message.channel.send(noPermEmbed);
            } */
        if (!args[0]) {
            return message.channel.send(`:x: | Please mention or provide an ID of a user too warn!`)
        }
        const target = message.mentions.members.first() || await message.guild.members.fetch(args[0])
        if (!target) {
            return message.channel.send(`:x: | Please mention or provide an ID of a **valid** user too warn!`)
        }
        if (target.id == message.author.id) {
            return message.channel.send(`:x: | You cannot warn yourself!`)
        }
        if (target.user.bot) {
            return message.channel.send(`:x: | You cannot warn a bot!`)
        }
        if (target.id == message.guild.owner.id) {
            return message.channel.send(`:x: | You cannot warn the server owner`)
        }
        if (!target.bannable) {
            return message.channel.send(`:x: | I cannot warn that user! Make sure I am above them in heirarchy`)
        }

        let reason = args.slice(1).join(' ');
        if (!reason) {
            reason = "N/A"
        }



        await Schema.findOne({
            userID: target.id
        }, async (err, data) => {
            if (!data) {
                new Schema({
                    guildID: message.guild.id,
                    userID: target.id,
                    warnings: 1,
                }).save()
                return message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`Successfully warned ${target} for reason: **${reason}**\n${target} warnings: **1**`).setColor("GREEN"))
            } else if (data) {
                await data.delete()
                new Schema({
                    guildID: message.guild.id,
                    userID: target.id,
                    warnings: data.warnings + 1,
                }).save()
                return message.channel.send(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`Successfully warned ${target} for reason: **${reason}**\n${target} warnings: **${data.warnings + 1}**`).setColor("GREEN"))
            }
        })
    }
}