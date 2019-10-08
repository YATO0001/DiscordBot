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
    //fetch_doggie(message)
    //local_doggie(message)
    send_doggie(message)
  }
});

const send_doggie = async (message, url, breed) => {
  let link = url || await fetch_doggie(message, breed)
  message.channel.send("Nice lil' doggie", {
      file: link
  });
}

const fetch_doggie = async (message, breed) => {
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
  let searchBreed = breed || breeds[Math.floor(Math.random() * breeds.length)]
  console.log("fetch_doggie, searchbreed", searchBreed)
  return new Promise((resolve, reject) => {
    let val = fetch(`https://api.woofbot.io/v1/breeds/${searchBreed}/image`)
    .then(x => x.json())
    .then(x => x['response']['url'])
    .catch(error => {
      console.log(error)
      reject(error)
    })
    console.log("Fetch_doggie val", val)
    resolve(val)
  })
}

const local_doggie = async (message) => {
  const file = new Discord.Attachment('./Pictures/husky.jpg');

  const exampleEmbed = {
  	title: 'Nice lil\'doggie',
  	image: {
  		url: 'attachment://husky.jpg',
  	},
  };
  
  message.channel.send({ files: [file], embed: exampleEmbed });
}

// login to Discord with your app's token
client.login(process.env.CLIENT_TOKEN);
