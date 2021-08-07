const chalk = require('chalk')

module.exports = async (client) => {
    console.log(`${chalk.magenta(client.user.tag)} ${chalk.blue('is now online!')}`)
    client.user.setActivity('in TCOCK', { type: 'WATCHING'})
}