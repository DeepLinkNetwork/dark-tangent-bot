const commando = require('discord.js-commando');
const config = require('../../config.json');
const Discord = require('discord.js');

class DTbotCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dtbotmaster',
			group: 'dtbotcmds',
			memberName: 'dtbotmaster',
			description: 'I will tell who is my master.',
			examples: [ `${config.prefix}dtbotmaster` ],
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['MANAGE_MESSAGES'],
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, _args) {
		await sleep(500);
		const embed = new Discord.MessageEmbed()
			.addField(':eyes: My Master is my father too.', 'His name is **Mr Deepender Choudhary** AkA @Deeקc๏ᖙe⚡')
			.addField('His Discord ID', '**404953341622484995**');
		message.channel.send({ embed: embed });
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = DTbotCommand;