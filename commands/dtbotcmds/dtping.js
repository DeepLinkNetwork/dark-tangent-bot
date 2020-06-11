const commando = require('discord.js-commando');
const config = require('../../config.json');

class DTbotCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dtping',
			group: 'dtbotcmds',
			memberName: 'dtping',
			description: 'Check bot ping Latency.',
			examples: [ `${config.prefix}dtping` ],
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['MANAGE_MESSAGES'],
			throttling: {
				usages: 1,
				duration: 30,
			},
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, _args) {
		const msg = await message.channel.send('Pinging DT BOT Server.....');
		msg.edit(`Wow! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`);
	}
}

module.exports = DTbotCommand;