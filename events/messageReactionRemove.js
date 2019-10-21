// From https://www.youtube.com/watch?v=IRf0SXCxcRA&list=PLeLrvnqwEnOasx86ozE-cdf1JagGcUlRf&index=9
// Need to understand this more to write it on my own

module.exports = async (client, messageReaction, user) => {
	const message = messageReaction.message;
	const channel = message.guild.channels.find(c => c.name === 'welcome');
	const member = message.guild.members.get(user.id);
	if (member.user.bot) return;


  let emoji = ["💩"]
  let roles = {
    "member": message.guild.roles.get('632944351009570846')
  }

	if (['🇦', '🇧', '🇨'].includes(messageReaction.emoji.name) && message.channel.id === channel.id) {
		switch (messageReaction.emoji.name) {
			case emoji[0]:
				member.removeRole(roles[emoji[0]]).catch(console.error);
				break;
		}
	}
};
