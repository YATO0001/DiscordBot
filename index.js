// require the discord.js module
const Discord = require('discord.js');
// feeetch
const fetch = require('node-fetch');
// Reading files
const fs = require('fs');
// Https for getting images from internet
const https = require('https');

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
    send_doggie(message)
  }
});

const send_doggie = (message, url, breed) => {
  let link = url || fetch_doggie(message, breed)
  console.log(link)
  message.channel.send("some text", {
      file: "https://img.woofbot.io/husky/0da78c5d56e7224af247161a261a040f.jpg"
  });
  if (link) {
    console.log(link)
  }
}

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


const fetch_doggie = async (message, breed) => {
  console.log("fetch_doggie_message", breed);
  // From https://api.woofbot.io/v1/breeds
  let breeds = [
    "Corgi",
    "Shiba",
    "Golden Retriever",
    "Pitbull",
    "Husky",
    "Samoyed",
    "Beagle",
    "Cocker Spaniel",
    "German Shepherd",
    "Greyhound",
    "Pomeranian",
    "Dachshund",
    "Boxer"
  ];
  console.log(breed)
  let searchBreed = breed || breeds[Math.floor(Math.random * breeds.length)]
  console.log(searchBreed)
  let val = await fetch('https://api.woofbot.io/v1/breeds/Husky/image')
  .then(x => x.json())
  .then(x => x['response']['url'])
  /*
  let embed = new Discord.RichEmbed()
  .setTitle("Doggie")
	.setColor('#0099ff')
	.setDescription('Some description here')
  .setURL(val)
	.setThumbnail(val)
  .setTimestamp()
  message.channel.send(embed)
  */
}

// login to Discord with your app's token
client.login(process.env.CLIENT_TOKEN);
