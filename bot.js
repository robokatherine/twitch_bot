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
	const num = rollDice(20);
	client.say(target, `You rolled a ${num}`);
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
    return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
