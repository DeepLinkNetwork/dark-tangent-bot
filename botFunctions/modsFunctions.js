const config = require('../config.json');
const Discord = require('discord.js');
const invites = {};
// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

module.exports = {
	guildMemberAddFunc: function(member) {
		const avatarUrl = (member.user.avatar) ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}` : 'https://www.risingcup.com/assets/images/dt_defaultUser.png';
		// const memberCounts = member.guild.memberCount;
		const addEmbed = new Discord.MessageEmbed()
			.setColor('#12ffdf')
			.setTitle(`@${member.user.username}#${member.user.discriminator}`)
			.setAuthor('Welcome to DarkTangent Esports', 'https://cdn.discordapp.com/attachments/678230114491957249/717717389776519178/darktangent.gif')
			.setDescription(`
─────────────────────────────

**:100: Server Rules ☛ <#650318943101124639> 

:100: Take Self Role ☛ <#650319956424261632>

:100: Chat Zone ☛ <#723667814543654913>

:100: Find Players ☛ <#650316706194915370>

:100: GFX Media ☛ <#650314088500428887>

:100: YT Links ☛ <#653277636470112272>**

─────────────────────────────`)
			.setThumbnail(`${avatarUrl}`)
			.addField('FOLLOW DARKTANGENT WEBSITE', 'https://darktangent.gg', false)
			.addField('FOLLOW DARKTANGENT RISING CUP', 'https://www.risingcup.com', false)
			.addField('FOLLOW DARKTANGENT ON YOUTUBE', 'https://www.youtube.com/darktangentesports', false)
			.addField('FOLLOW DARKTANGENT ON INSTAGRAM', 'https://www.instagram.com/darktangent.gg', false)
			.addField('FOLLOW DARKTANGENT ON TWITTER', 'https://twitter.com/DarkTangent_gg', false)
			.addField('FOLLOW DARKTANGENT ON FACEBOOK', 'https://www.facebook.com/DarkTangent.gg', false)
			.setImage('https://cdn.discordapp.com/attachments/678230114491957249/721095572584398858/DarkTangentWelcome.gif')
			.setTimestamp()
			.setFooter('From DarkTangent Team', 'https://www.risingcup.com/assets/images/dt_logo.png');
		member.send({ embed: addEmbed });
	},
	sendWelcomeMessage: function(member, channel) {
		const avatarUrl = (member.user.avatar) ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}` : 'https://www.risingcup.com/assets/images/dt_defaultUser.png';
		// const memberCounts = member.guild.memberCount;
		const addEmbed = new Discord.MessageEmbed()
			.setColor('#12ffdf')
			.setTitle(`@${member.user.username}#${member.user.discriminator}`)
			.setAuthor('Welcome to DarkTangent Esports', 'https://cdn.discordapp.com/attachments/678230114491957249/717717389776519178/darktangent.gif')
			.setDescription(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**:snowflake: Server Rules :point_right: <#650318943101124639> 

:snowflake: Take Self Role :point_right: <#650319956424261632>

:snowflake: Chat Zone :point_right: <#723667814543654913>

:snowflake: Find Players :point_right: <#650316706194915370>

:snowflake: GFX Media :point_right: <#650314088500428887>

:snowflake: YT Links :point_right: <#653277636470112272>**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
			.setThumbnail(`${avatarUrl}`)
			.setImage('https://cdn.discordapp.com/attachments/678230114491957249/721095572584398858/DarkTangentWelcome.gif')
			.setTimestamp()
			.setFooter('Enjoy your stay here!', 'https://www.risingcup.com/assets/images/dt_logo.png');
		channel.send({ embed: addEmbed });
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
					const embed = new Discord.MessageEmbed()
						.setAuthor(`${message.author.username}#${message.author.discriminator} has been warned`, message.author.avatarURL())
						.setDescription('**Reason:** You are not allowed to sell anything in the server.')
						.setTimestamp()
						.setFooter('From DarkTangent Team', 'https://www.risingcup.com/assets/images/dt_logo.png');
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
			if(r) break;
		}
	},
	generalChatRestrict_keywords: function(message) {
		let m;
		const str = message.content;
		// Restricted Keywords
		const keywords = [' id ', ' pass', 'i need', 'we need', 'need', 'we need player', 'Team requirements', 'We are looking'];
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
							.setAuthor(`${message.author.username}#${message.author.discriminator} has been warned`, message.author.avatarURL())
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
	updateInviteCache: function(client) {
		wait(1000);
		client.guilds.cache.forEach(g => {
			g.fetchInvites().then(guildInvites => {
				invites[g.id] = guildInvites;
			});
		});
	},
	guildMemberInviteLog: function(member, client) {
		const avatarUrl = (member.user.avatar) ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}` : 'https://www.risingcup.com/assets/images/dt_defaultUser.png';
		const memberCounts = member.guild.memberCount;
		member.guild.fetchInvites().then(guildInvites => {
			const ei = invites[member.guild.id];
			invites[member.guild.id] = guildInvites;

			const logChannel = member.guild.channels.cache.find(channel => channel.id === config.inviteLogChannelId);
			const joinedTimestamp = new Date(member.joinedTimestamp).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
			const createdDate = new Date(member.user.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
			try {
				const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
				const inviter = client.users.cache.get(invite.inviter.id);
				const addEmbed = new Discord.MessageEmbed()
					.setColor('#12ffe9')
					.setAuthor(`@${member.user.username}#${member.user.discriminator} Joined at ${memberCounts}`, `${avatarUrl}`)
					.addField('Invite Code', `${invite.code}`, false)
					.addField('Invite Uses', `${invite.uses}`, false)
					.addField('Invited by', `${inviter.tag}`, false)
					.addField('Joined Date', `${joinedTimestamp}`)
					.addField('Account Created', `${createdDate}`, false)
					.setTimestamp();
				logChannel.send({ embed: addEmbed });
			}
			catch(error) {
				const addEmbed = new Discord.MessageEmbed()
					.setColor('#12ffe9')
					.setAuthor(`@${member.user.username}#${member.user.discriminator} Joined at ${memberCounts}`, `${avatarUrl}`)
					.addField('Joined Date', `${joinedTimestamp}`)
					.addField('Account Created', `${member.user.createdAt}`, false)
					.setTimestamp();
				logChannel.send({ embed: addEmbed });
			}
		});
	},
};