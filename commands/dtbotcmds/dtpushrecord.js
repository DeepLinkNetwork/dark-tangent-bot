const commando = require('discord.js-commando');
const config = require('../../config.json');

// algolia config
const algoliasearch = require('algoliasearch');

const al_client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN);
const index = al_client.initIndex('dt-server-user');

class DTbotCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dtpushrecord',
			group: 'dtbotcmds',
			memberName: 'dtpushrecord',
			description: '---Authorized Only---',
			examples: [ `${config.prefix}dtpushrecord` ],
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
		const dmGuild = message.guild;
		message.channel.send('**Enter Your Password.**');

		const filter = m => {
			return m.author.id === message.author.id;
		};

		message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
			.then(collected => {
				const content = collected.first().content;
				if((content).trim() == 'deep@dev') {
					const objects = [];
					(dmGuild.members.cache).forEach(el => {
						// console.log(`${el.user.id} => ${el.user.username}`);
						objects.push({
							'id': el.user.id,
							'username': el.user.username,
							'bot': el.user.bot,
							'discriminator': el.user.discriminator,
							'avatar': el.user.avatar,
						});
					});

					index
						.saveObjects(objects, { autoGenerateObjectIDIfNotExist: true })
						.then(({ objectIDs }) => {
							const membercount = (Array.isArray(objectIDs)) ? objectIDs.length : objectIDs;
							message.channel.send(`**Members Pushed => ${membercount}**`);
							// console.log(objectIDs);
						});
				}
				else {
					message.channel.send('**Ohh Dear Invalid Password !**');
					// index
					// 	.search('D')
					// 	.then(({ hits }) => {
					// 		console.log(hits);
					// 	})
					// 	.catch(err => {
					// 		console.log(err);
					// 	});
				}
			})
			.catch(collected => {
				message.channel.send(`**__Collection Timed out.__ => Collected ${collected.size} items**`);
			});
	}
}

module.exports = DTbotCommand;