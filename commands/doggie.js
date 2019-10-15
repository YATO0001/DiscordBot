const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
  console.log("dog")
  // TODO: remove .replace and clean up code
  // From https://api.woofbot.io/v1/breeds
  let breeds = [
    "corgi",
    "shiba",
    "golden_retriever",
    "pitbull",
    "husky",
    "samoyed",
    "beagle",
    "cocker_spaniel",
    "german_shepherd",
    "greyhound",
    "pomeranian",
    "dachshund",
    "boxer"
  ];
  if (args[0] === "breeds") {
    message.channel.send(breeds); return
  }
  let searchBreed = breeds[breeds.indexOf(args[0])] || breeds[Math.floor(Math.random() * breeds.length)] 
  let link = await fetch(`https://api.woofbot.io/v1/breeds/${searchBreed.replace("_", " ")}/image`)
    .then(x => x.json())
    .then(x => x['response']['url'])
    .catch(error => {console.log(error)})
  message.channel.send(`Here's a nice lil' ${searchBreed.replace("_", " ")}`, {
      file: link
  });
}

exports.help = {
  name: "doggie"
}