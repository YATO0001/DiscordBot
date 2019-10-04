// require the discord.js module
const Discord = require('discord.js');
// feeetch
const fetch = require('node-fetch');
// Reading files
const fs = require('fs');

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
  if (!message.content.startsWith(process.env.PREFIX ||
    message.author.bot)) { return }
  if (message.content === '!dog') {
    fetch_doggie(message)
    local_doggie(message)
  }
});

const local_doggie = async (message) => {
  const file = new Discord.Attachment('./Pictures/husky.jpg');

  const exampleEmbed = {
  	title: 'Some toitle',
  	image: {
  		url: 'attachment://husky.jpg',
  	},
  };
  
  message.channel.send({ files: [file], embed: exampleEmbed });
}

const fetch_doggie = async (message) => {
  console.log("fetch_doggie_message", message)
  let val = await fetch('https://api.woofbot.io/v1/breeds/Husky/image')
  .then(x => x.json())
  .then(x => x['response']['url'])
  let embed = new Discord.RichEmbed()
  .setTitle("Doggie")
	.setColor('#0099ff')
	.setDescription('Some description here')
  .setURL(val)
	.setThumbnail(val)
  .setTimestamp()
  message.channel.send(embed)
}

// login to Discord with your app's token
client.login(process.env.CLIENT_TOKEN);
