
const Discord = require('discord.js');
const { readdir, readdirSync } = require('fs');
const { promisify } = require('util');
const readdir = promisify(readdir);

module.exports = async function configuration(client) {

    const eventFiles = readdirSync('./events/').filter((file) => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
    }

    const folders = await readdir('./commands/');
    folders.forEach((direct) => {
        const commandFiles = readdirSync(`./commands/${direct}/`).filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const fileExports = require(`../commands/${direct}/${file}`);
            
            client.commands.set(fileExports.name, props);
            client.cooldowns.set(fileExports.name, new Discord.Collection());
            
            fileExports.aliases.forEach((alias) => {
                client.aliases.set(alias, fileExports.name);
            });
        }
    });

}