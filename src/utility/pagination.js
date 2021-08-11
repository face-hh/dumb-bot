const {
    MessageButton
} = require('discord-buttons')
const validStyles = [
    "gray",
    "red",
    "green",
    "blurple"
]

/**
 * button pagination
 * @param {options} 
 */
module.exports = async function Pagination(options) {


    let button1 = new MessageButton()
        .setLabel(options.button1.label)
        .setStyle(options.button1.style)
        .setID('forward')

    let button2 = new MessageButton()
        .setLabel(options.button2.label)
        .setStyle(options.button2.style)
        .setID('back')
    
    let currentPage = 0;

    const embeds = options.embeds

    const message = options.message

    let sussyEmbed = await message.channel.send({
        buttons: [button1, button2],
        embed: embeds[currentPage]
      })

      
    const filter = (button) => button.clicker.user.id === message.author.id;
    const collector = sussyEmbed.createButtonCollector(filter, {
      time: options.timeActive
    });

    collector.on('collect', async b => {
        await b.reply.defer()
        if(b.clicker.user.id !== message.author.id) {
            if(options.invalidUser.ephemeralReply == true) {
                b.reply.send(options.invalidUser.message, true)
            } else {
                message.channel.send(options.invalidUser.message)
            }
        }
        if (b.id === 'back') {
          if (currentPage < embeds.length - 1) {
            currentPage += 1;
            sussyEmbed.edit({
              buttons: [button1, button2],
              embed: embeds[currentPage]
            })
  
          }
        } else if (b.id === 'forward') {
          if (currentPage !== 0) {
            currentPage -= 1;
            sussyEmbed.edit({
              buttons: [button1, button2],
              embed: embeds[currentPage]
            })
          }
        }
    })

    if(options.setDisabled == true) {
        setTimeout(() => {
            let b1 = button1.setDisabled()
            let b2 = button2.setDisabled()
            sussyEmbed.edit({
              embed: embeds[currentPage],
              buttons: [b1, b2],
            })
          }, options.timeActive)
    }
 }

// usage
/*
await Pagination({
    message: message, // the discord message
    embeds: pages, // Array of embeds
    button1: {
        label: '<<', // the label of the back button
        style: 'gray', // discord button style
    },
    button2: {
        label: '>>',  // the label of the forward button
        style: 'gray', // discord button style
    },
    timeActive: 10, // the time that the buttons are valid, in MS
    setDisabled: true, // should the buttons be setDisbaled after the allocated time 
    invalidUser: {
        ephemeralReply: true, // should the reply be ephemeral if the button clicker is not the message author
        message: 'only the message author can use the buttons!', // the message to be send when such event occurs
    }
});

*/
