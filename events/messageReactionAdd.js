// From https://www.youtube.com/watch?v=IRf0SXCxcRA&list=PLeLrvnqwEnOasx86ozE-cdf1JagGcUlRf&index=9
// Need to understand this more to write it on my own

module.exports = async (client, messageReaction, user) => {
  const message = messageReaction.message;
  const channel = message.guild.channels.find(x => x.name === "welcome")
  const member = message.guild.members.get(user.id)
  console.log("Reaction add")
  if (member.user.bot) return

  let emoji = ["💩"]
  let roles = {
    "member": message.guild.roles.get('632944351009570846')
  }

  if (emoji.includes(messageReaction.emoji.name) && message.channel.id === channel.id) {
    switch(messageReaction.emoji.name){
      case emoji[0]:
        console.log("Adding member")
        member.addRole(roles["member"]).catch(console.err)
        break;
    }

  }

  // add roles

  /*
  let embed = new RichEmbed()
    .setTitle("Roles")
    .setDescription(`
    React with: ${emoji[0]}
    `)

  message.send(embed).then(async msg => {
      await msg.react(emoji[0])

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
  })
  */
}