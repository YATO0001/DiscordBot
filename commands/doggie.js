const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
  console.log("dog")
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
  console.log(args)
  let searchBreed = breeds[breeds.findIndex[args[1]]] || breeds[Math.floor(Math.random() * breeds.length)] 
  console.log("link", link)
  let val = await fetch(`https://api.woofbot.io/v1/breeds/${breed}/image`)
    .then(x => x.json())
    .then(x => x['response']['url'])
    .catch(error => {console.log(error)})
  message.channel.send(`Here's a nice lil' ${searchBreed}`, {
      file: link
  });
}

exports.help = {
  name: "doggie"
}