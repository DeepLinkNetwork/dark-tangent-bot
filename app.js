/* eslint-disable no-var */
const dotenv = require('dotenv');
const config = require('./config.json');
dotenv.config();

const commando = require('discord.js-commando');
const { Intents } = require('discord.js');

const path = require('path');
const axios = require('axios');

const modsFunctions = require('./botFunctions/modsFunctions.js');

const bot = new commando.Client({
	commandPrefix: process.env.PREFIX || config.prefix,
	owner: process.env.OWNER_ID || config.id,
	unknownCommandResponse: false,
	ws: { intents: Intents.ALL },
});

const figlet = require('figlet');
require('colors');
require('readline');

bot.on('ready', () => {
	clear();
	console.log(`Logged in as ${bot.user.tag}! (${bot.user.id})`);
	console.log('_________________________________________');
	bot.user.setPresence({ activity: { name: 'DarkTangent Server', type: 'WATCHING', url:'https://discord.gg/kNKK5zG' }, status: 'dnd' })
		.then(console.log('Activity Set Successfully!'))
		.catch(console.error);
});

bot.on('error', (error) => {
	axios.post(config.errNotifier, `Bot ERROR_EVENT Log :
	error => ${error} `);
	bot.login(process.env.BOT_TOKEN || config.token);
});

// eslint-disable-next-line no-unused-vars
bot.on('shardDisconnect', (event, _shardID) => {
	console.error('A websocket connection encountered an error:', event);
	axios.post(config.errNotifier, `Bot Event Disconnect Log :
	socket => ${event.target.url} 
	event.code => ${event.code} ,
	event.type => ${event.type} ,
	event.reason => ${event.reason} ,
	event.wasClean => ${event.wasClean} `);
	bot.login(process.env.BOT_TOKEN || config.token);
	bot.user.setPresence({ activity: { name: 'DarkTangent Server', type: 'WATCHING', url:'https://discord.gg/kNKK5zG' }, status: 'dnd' })
		.then(console.log('Activity Set Successfully!'))
		.catch(console.error);
});

// relogin in an hour.
// setInterval(function() {
// 	// console.log(`Started Relogin to server per timeout of ${config.reconnect} ms.`);
// 	bot.login(process.env.BOT_TOKEN || config.token);
// }, config.reconnect);

// starting bot ping on console logging
// setInterval(function() {
// 	console.log(`Bot Ping => ${bot.ws.ping}`);
// }, 1000);

bot.on('guildMemberUpdate', (oldMember, newMember) => {
	const arr1 = newMember._roles;
	const arr2 = oldMember._roles;
	const newDiff = arr1.filter(x => !arr2.includes(x));

	if(newDiff == config.alliesrole) {
		newMember.send(`Hey ${newMember.user.username}, **Alliance-Watcher** role is added to you, Please **re-login** your account to see <#703970053951062066> channel past message history.`);
	}
});

bot.on('guildMemberAdd', (member) => {
	modsFunctions.guildMemberAddFunc(member);
});

bot.on('message', function(message) {
	modsFunctions.generalChatRestrict_buyer(message);
	modsFunctions.generalChatRestrict_keywords(message);
});

bot.registry
	.registerDefaultTypes()
	.registerGroups([
		['dtbotcmds', 'DarkTangent Basic commands'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		help: false,
		prefix: false,
		eval: false,
		ping: true,
		commandState: false,
		unknownCommand: false,
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(process.env.BOT_TOKEN || config.token);

process.on('unhandledRejection', error => {
	axios.post(config.errNotifier, `Bot unhandledRejection Error :
	error => ${error} `);
	console.error('Unhandled promise rejection:', error);
});

function clear() {
	console.clear();
	console.log(figlet.textSync(`DarkTangent Bot v${config.botversion}`).green);
	console.log(`>Type  ${process.env.PREFIX || config.prefix}help  in a chat.\n\n`);
}