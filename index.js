// require the discord.js module
const Discord = require('discord.js');
// feeetch
const fetch = require('node-fetch');
// Reading files
const fs = require('fs');
// Https for getting images from internet
const https = require('https');
// Enmap for commands
const Enmap = require('enmap');
// create a new Discord client
const client = new Discord.Client();


const { prefix } = require('./config.json')

// Set up dotenv
require('dotenv').config()

client.commands = new Enmap()

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(`${client.user.username} is ready for action`);
});

client.on('message', message => {
	console.log(message.content);
  if (!message.content.startsWith(prefix ||
    message.author.bot)) { return }
  if (message.content === '!dog') {
    send_doggie(message)
  }
});

const send_doggie = async (message, url, breed) => {
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
  let link = url || await fetch_doggie(message, searchBreed)
  console.log("link", link)
  message.channel.send(`Here's a nice lil' ${searchBreed}`, {
      file: link
  });
}

const fetch_doggie = async (message, breed) => {
  console.log(message, breed)
  return new Promise((resolve, reject) => {
    let val = fetch(`https://api.woofbot.io/v1/breeds/${breed}/image`)
    .then(x => x.json())
    .then(x => x['response']['url'])
    .catch(error => {
      console.log(error)
      reject(error)
    })
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


fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    // Load the command file itself
    let props = require(`./commands/${file}`);
    // Get just the command name from the file name
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  });
});

// login to Discord with your app's token
client.login(process.env.CLIENT_TOKEN);
