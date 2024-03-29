const commando = require('discord.js-commando');
const config = require('../../config.json');
const Discord = require('discord.js');

class DTbotCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'say',
			group: 'dtbotcmds',
			memberName: 'say',
			description: 'Send a message to a channel through the bot.',
			examples: [ `${config.prefix}say Hello this msg will get repeated.` ],
			guildOnly: true,
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, _args) {
		let msg = message.content;

		try {
			msg = msg.substring(msg.indexOf('say') + 3);
		}
		catch(error) {
			console.log(error);
			return;
		}


		if(!msg || msg.length <= 0) {
			const embed = new Discord.MessageEmbed()
				.addField(':x: Failed to repeat', 'Wrong Message Length')
				.addField(':eyes: Listen up!', 'Message length should be greater than 0 Chars.');
			message.channel.send({ embed: embed });
			return;
		}

		// eslint-disable-next-line no-unused-vars
		message.delete().catch(function(O_o) { console.log(O_o); });
		await sleep(500);
		message.channel.send(msg);
		return;
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = DTbotCommand;