const { Collection, Client } = require('discord.js')

class Bot extends Client {
    constructor(options) {
        super(options);

        this.commands = new Collection;
        this.aliases = new Collection;
        this.events = new Collection;
        this.cooldowns = new Collection;

    }

    start(token) {
        require('./reply')
        require('./configuration')(this)

        this.login(token)
    }
}

module.exports = Bot