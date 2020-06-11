const config = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	guildMemberAddFunc: function(member) {
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
	},
	generalChatRestrict_buyer: function(message) {
		let m;
		const regex = /buyer/img;
		const str = message.content;

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
	},
	generalChatRestrict_keywords: function(message) {
		let m;
		const str = message.content;
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
	},
};