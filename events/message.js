const { prefix } = require('../config.json')

// Almost copied all from
// https://anidiots.guide/first-bot/a-basic-command-handler
module.exports = (client, message) => {
  console.log("Message")
  //console.log(message.content)
  // Ignore all bots
  if (message.author.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;
  console.log("noe run")
  // Run the command
  cmd.run(client, message, args);
};