const commando = require('discord.js-commando');
const config = require('../../config.json');

class DTbotCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dtlist',
			group: 'dtbotcmds',
			memberName: 'dtlist',
			guildOnly: true,
			description: 'Display Total Member List',
			examples: [ `${config.prefix}dtlist` ],
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
		const dmGuild = message.guild;
		if(dmGuild) {
			const membercount = this.client.guilds.cache.get(config.serverId).memberCount;
			const guild = this.client.guilds.cache.get(config.serverId);
			await sleep(500);
			message.channel.send(`There are now **${membercount}** members in **${dmGuild.name}**.`);
			await sleep(500);
			guild.channels.cache.get(config.totalFamChannedId).setName(`ᗫ₸・FAM ≋ ${membercount}`);
		}
		else {
			await sleep(500);
			message.channel.send(`Hey ${message.author.username}, Please run this command inside Server channel.`);
		}
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = DTbotCommand;