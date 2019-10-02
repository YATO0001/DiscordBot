// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

require('dotenv').config()

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	console.log(message.content);
  if (message.content === '!dog') {
    console.log("Dogmessage")
    message.channel.send('Doggie!')
  }
});

// login to Discord with your app's token
client.login(process.env.CLIENT_TOKEN);
