require('dotenv').config()

const DumbPepe = require('./utility/bot')

const pepe = new DumbPepe({ disableEveryone: true }, { fetchAllMembers: true })

pepe.start(process.env.token)