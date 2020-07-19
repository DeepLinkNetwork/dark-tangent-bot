const commando = require('discord.js-commando');
const config = require('../../config.json');
const Discord = require('discord.js');

class DTbotCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dtmembers',
			group: 'dtbotcmds',
			memberName: 'dtmembers',
			description: 'Display Total Member List',
			throttling: {
				usages: 1,
				duration: 30,
			},
			examples: [ `${config.prefix}members` ],
			guildOnly: true,
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, _args) {
		let msg = message.content;
		let replyMsg = '';
		try {
			msg = msg.substring(msg.indexOf('dtmembers') + 9);

			if(msg.indexOf('<@&') != -1) {
				msg = msg.substring(
					msg.lastIndexOf('&') + 1,
					msg.lastIndexOf('>'),
				);
			}

			const roleID = msg.trim();
			const membersWithRole = message.guild.roles.cache.get(roleID).members;

			replyMsg = '**Members In ** <@&' + roleID + '> \n';

			if(membersWithRole.size == 0) {
				replyMsg = 'Currently there are **Zero Members** in <@&' + roleID + '> \n';
			}
			else {
				let i = 0;
				for (const item of membersWithRole.values()) {
					replyMsg += '**>** ' + item.user.username + ' *---TAG-->* <@' + item.user.id + '> \n';
					i++;
					if(i == 90) {
						break;
					}
				}
			}
		}
		catch(err) {
			const embed = new Discord.MessageEmbed()
				.setColor('#12ffdc')
				.setTitle('Command: dt? dtmembers')
				.setDescription(`
**Description:** List members in a role(s) (max 90)
**Cooldown:** 30 seconds
**Usage:** dt? dtmembers [role]
Example:
?members Staff
?members Staff, Updates
?members Staff not Mod`);
			message.channel.send({ embed: embed });
			return;
		}

		// eslint-disable-next-line no-unused-vars
		message.delete().catch(function(O_o) { console.log(O_o); });
		await sleep(500);
		message.channel.send(replyMsg);
		return;
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = DTbotCommand;