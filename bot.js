const tmi = require('tmi.js');

const project_description = `This is the description of what I'm working on!`;

const social_links = `Follow me on Twitter/Instagram! https://twitter.com/robokatherine https://www.instagram.com/robokatherine/`

// Define configuration options
const opts = {
    identity: {
	username: 'BotMacklinFBI',
	password: 'OAUTH KEY GOES HERE'
    },
    channels: [
    'robokatherine'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    if (commandName === '!d20') {
	client.say(target, `${rollDice(20)}`);
	console.log(`* Executed ${commandName} command`);
    } else if (commandName === '!whatsgoingon'){
    client.say(target, `${project_description}`);
    console.log(`* Executed ${commandName} command`);
    } else if (commandName === '!social') {
    client.say(target,`${social_links}`);
    console.log(`* Executed ${commandName} command`);
    } else if (commandName === '!blog') {
    client.say(target,`Read my nonsense! http://topping.pizza`);
    console.log(`* Executed ${commandName} command`);
    } else if (commandName === '!github') {
    client.say(target,`Check out my github! https://github.com/robokatherine`);
    console.log(`* Executed ${commandName} command`);
    } else {
	console.log(`* Unknown command ${commandName}`);
    }
}

// Function called when the "dice" command is issued
function rollDice (sides) {
    const num = Math.floor(Math.random() * sides) + 1;
    if (num === 1) {
        return `Well. You rolled a 1. RIP in pieces.`;
    } else if (num < 6) {
        return `You rolled a ${num}. Better luck next time, bud.`;
    } else if (num < 11) {
        return `You rolled a ${num}. It could be worse.`;
    } else if (num < 16) {
        return `You rolled a ${num}. Neat!`;
    } else if (num < 20) {
        return `You rolled a ${num}! NICE!`;
    } else {
        return `YOU ROLLED A 20! FRIGGIN SWEET!`;
    }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
