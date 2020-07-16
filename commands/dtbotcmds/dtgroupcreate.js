const commando = require('discord.js-commando');
const config = require('../../config.json');
const axios = require('axios');

class DTbotCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dtgroupcreate',
			group: 'dtbotcmds',
			memberName: 'dtgroupcreate',
			description: '---Authorized Only---',
			examples: [ `${config.prefix}dtgroupcreate` ],
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['ADMINISTRATOR'],
			guildOnly: true,
			hidden: true,
			throttling: {
				usages: 1,
				duration: 500,
			},
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, _args) {
		message.channel.send('**Enter Your Password.**');

		const filter = m => {
			return m.author.id === message.author.id;
		};

		message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
			.then(collected => {
				const content = collected.first().content;
				if((content).trim() == 'deep@dev') {
					axios.post('https://risingcup.com/createGroupHook', { 'body':'allow' }, {
						headers: {
							'Content-Type': 'application/json',
							'X-access-key': 'pzsi6M0Gjk',
						},
					});
					// eslint-disable-next-line no-unused-vars
					message.delete().catch(function(O_o) { console.log(O_o); });
					message.channel.send('**Cmd Executed Successfully ,Output will be logged in <#733243937736753192> !**');
				}
				else {
					message.channel.send('**Ohh Dear Invalid Password !**');
				}
			})
			.catch(collected => {
				message.channel.send(`**__Connection Timed out.__ => Collected ${collected.size} items**`);
			});
	}
}

module.exports = DTbotCommand;