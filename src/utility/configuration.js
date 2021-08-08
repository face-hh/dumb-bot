
const Discord = require('discord.js');
const { readdir, readdirSync } = require('fs');
const { promisify } = require('util');
const preaddir = promisify(readdir);

module.exports = async function configuration(pepe) {

    const eventFiles = readdirSync('./src/events/').filter((file) => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        const eventName = file.split('.')[0];
        pepe.on(eventName, event.bind(null, pepe));
    }

    const folders = await preaddir('./src/commands/');
    folders.forEach((direct) => {
        const commandFiles = readdirSync(`./src/commands/${direct}/`).filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const fileExports = require(`../commands/${direct}/${file}`);
            
            pepe.commands.set(fileExports.name, fileExports);
            pepe.cooldowns.set(fileExports.name, new Discord.Collection());
            
            fileExports.aliases.forEach((alias) => {
                pepe.aliases.set(alias, fileExports.name);
            });
        }
    });

}