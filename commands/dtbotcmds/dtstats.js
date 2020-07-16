const commando = require('discord.js-commando');
const config = require('../../config.json');
const Discord = require('discord.js');
const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

class DTbotCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dtstats',
			group: 'dtbotcmds',
			memberName: 'dtstats',
			description: 'Gives some useful bot statistics',
			throttling: {
				usages: 1,
				duration: 50,
			},
			examples: [ `${config.prefix}dtstats` ],
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['EMBED_LINKS'],
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, _args) {
		const time = Date.now();
		const duration = moment.duration(this.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
		const memberCounts = this.client.guilds.cache.get(config.serverId).memberCount;
		const embed = new Discord.MessageEmbed()
			.setColor('RED')
			.setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
			.setTitle('BOT STATS')
			.addField('Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
			.addField('Uptime', `${duration}`, true)
			.addField('Commands', `${config.botCmds}`, true)
			.addField('Users', `${memberCounts.toLocaleString()}`, true)
			.addField('Servers', `${this.client.guilds.cache.size.toLocaleString()}`, true)
			.addField('Channels', `${this.client.channels.cache.size.toLocaleString()}`, true)
			.addField('Discord.js', `v${version}`, true)
			.addField('Node', `${process.version}`, true)
			.addField('Bot Version', `${config.botversion}`, true)
			.addField('Bot Creator', 'Mr Deepender Choudhary AKA @Deeקc๏ᖙe:zap:', true)
			.setFooter(`Time taken: ${Date.now() - time}ms`);
		message.channel.send({ embed });
	}
}

module.exports = DTbotCommand;