const chalk = require('chalk')

module.exports = async (pepe) => {
    console.log(`${chalk.magenta(pepe.user.tag)} ${chalk.blue('is now online!')}`)
    pepe.user.setActivity('in TCOCK', { type: 'WATCHING'})
}