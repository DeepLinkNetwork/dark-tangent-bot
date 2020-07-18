const commando = require('discord.js-commando');
const config = require('../../config.json');

class DTbotCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'members',
			group: 'dtbotcmds',
			memberName: 'members',
			guildOnly: true,
			description: 'Display Total Member List',
			examples: [ `${config.prefix}members` ],
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['MANAGE_MESSAGES'],
			throttling: {
				usages: 1,
				duration: 60,
			},
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, _args) {
		let msg = message.content;
		let replyMsg = '';
		try {
			msg = msg.substring(msg.indexOf('members') + 7);

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
				for (const item of membersWithRole.values()) {
					replyMsg += '**>** ' + item.user.username + ' *~TAG~* <@' + item.user.id + '> \n';
				}
			}
		}
		catch(err) {
			replyMsg = 'Error Invalid Role !';
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