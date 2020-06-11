/* eslint-disable no-var */
const dotenv = require('dotenv');
const config = require('./config.json');
dotenv.config();

const Discord = require('discord.js');
const commando = require('discord.js-commando');
const path = require('path');

const bot = new commando.Client({
	commandPrefix: process.env.PREFIX || config.prefix,
	owner: process.env.OWNER_ID || config.id,
	unknownCommandResponse: false,
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

// eslint-disable-next-line no-unused-vars
bot.on('error', (_error) => {
	bot.login(process.env.BOT_TOKEN || config.token);
});

bot.on('disconnected', function() {
	// alert the console
	console.log('Disconnected from server ...');

	console.log('Reconnecting to Discord in 2 second...');
	setInterval(function() {
		bot.login(process.env.BOT_TOKEN || config.token);
	}, 2000);
});

bot.on('message', function(message) {
	const regex = /buyer/img;
	const str = message.content;
	let m;

	while ((m = regex.exec(str)) !== null) {
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		// eslint-disable-next-line no-unused-vars
		const r = m.some(function(match, _groupIndex) {
			// console.log(`Found slag key match, group ${groupIndex}: ${match}`);
			// console.log(`message.channel.id => ${message.channel.id}`);
			if(match == 'buyer' && message.channel.id == config.general_chat_id) {
				if (message) message.delete();
				const embed = new Discord.MessageEmbed()
					.setAuthor(`${message.author.username} has been warned`, message.author.avatarURL)
					.setDescription('**Reason:** You are not allowed to sell anything in the server.')
					.setTimestamp()
					.setFooter('From DarkTangent Team', 'https://www.risingcup.com/assets/images/dt_logo.png');
				message.channel.send({ embed: embed });
				return true;
			}
		});
		if(r) break;
	}

	// Restricted Keywords
	const keywords = [' id', ' pass', 'i need', 'we need', 'need', 'we need player'];
	for (let index = 0; index < keywords.length; index++) {
		const element = new RegExp(keywords[index], 'img');
		let closeLoop = false;
		while ((m = element.exec(str)) !== null) {
			if (m.index === element.lastIndex) {
				element.lastIndex++;
			}
			// eslint-disable-next-line no-unused-vars
			const r2 = m.some(function(match, _groupIndex) {
				// console.log(`Found slag key match, group ${groupIndex}: ${match}`);
				if(message.channel.id == config.general_chat_id) {
					const embed = new Discord.MessageEmbed()
						.setAuthor(`${message.author.username} has been warned`, message.author.avatarURL)
						.setDescription(`**Reason:** We detected **__${match}__** in your message. Please post such message in  ☛  <#650316706194915370>`);
					if((config.admins).includes(message.author.id)) {
						message.author.send(`Hey ${message.author.username}, I cannot warn you because you are DT **ADMIN** or **MODS**, Please Delete that message if it violates terms of public chat.\n__Your Message__ => ${message.content}`);
					}
					else {
						if (message) message.delete();
						message.channel.send({ embed: embed });
					}
					return true;
				}
			});
			if(r2) {
				closeLoop = r2;
				break;
			}
		}
		if(closeLoop) {break;}
	}
});

// also, reconnect the bot hourly.
setInterval(function() {
	console.log(`Reconnecting to server per timeout of ${config.reconnect} ms.`);
	bot.destroy();
	bot.login(process.env.BOT_TOKEN || config.token);
}, config.reconnect);

bot.on('guildMemberUpdate', (oldMember, newMember) => {
	const arr1 = newMember._roles;
	const arr2 = oldMember._roles;
	const newDiff = arr1.filter(x => !arr2.includes(x));

	if(newDiff == config.alliesrole) {
		newMember.send(`Hey ${newMember.user.username}, **Alliance-Watcher** role is added to you, Please **re-login** your account to see <#703970053951062066> channel past message history.`);
	}
});


bot.on('guildMemberAdd', function(member) {
	const addEmbed = new Discord.MessageEmbed()
		.setAuthor(`Hello @${member.user.username} DarkTangent Welcomes you.`, `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}`)
		.setDescription(`
**:white_check_mark: Make sure you must Read <#650318943101124639> :100: 

:white_check_mark: Also take Self Role From <#650319956424261632> :100: 

:white_check_mark:  Use <#650308208304586784> to chat with us :100: **

**:checkered_flag: Regards**
**:checkered_flag: DarkTangent Esports**`)
		.setTimestamp()
		.setFooter('From DarkTangent Team', 'https://www.risingcup.com/assets/images/dt_logo.png');
	member.send({ embed: addEmbed });
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

bot.registry
	.registerDefaultTypes()
	.registerGroups([
		['dtbotcmds', 'DarkTangent Basic Use'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		help: true,
		prefix: false,
		eval: false,
		ping: true,
		commandState: false,
		unknownCommand: false,
	})
	.registerCommandsIn(path.join(__dirname, 'commands'));

bot.login(process.env.BOT_TOKEN || config.token);


function clear() {
	console.clear();
	console.log(figlet.textSync('DarkTangent Bot v1.0').green);
	console.log(`>Type  ${process.env.PREFIX || config.prefix}help  in a chat.\n\n`);
}