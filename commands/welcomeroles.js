const { RichEmbed } = require('discord.js');

// From https://www.youtube.com/watch?v=IRf0SXCxcRA&list=PLeLrvnqwEnOasx86ozE-cdf1JagGcUlRf&index=9
// Need to understand this more to write it on my own

exports.run = async (client, message, user) => {
  console.log("Welcome roles")
  message.delete().catch(console.err)
  if (user.bot) return

  let emoji = ["💩"]

  let filter = (reaction, user) => emoji.includes(reaction.emoji.name) && user.id === message.author.id

  // add roles

  let embed = new RichEmbed()
    .setTitle("Roles")
    .setDescription(`
    React with: ${emoji[0]}
    `)

  message.channel.send(embed).then(async msg => {
      await msg.react(emoji[0])

      /*
      msg.awaitReaction(filter, {
        max: 1,
        time: 30000,
        errors: ['time']
      }).then(collected => {
        const reaction = collected.first()
        switch (reaction.emoji.name) {
          case emoji[0]: 
            console.log("Hei")
            break;
        }
      }).catch(err => {

      })
      */
  })
}

exports.help = {
    name: 'welcomeroles'
};