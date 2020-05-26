const commando = require('discord.js-commando');
const app = require('../../app.js');
const config = require('../../config.json');
const Discord = require('discord.js');
const util = require('util');
const { Client, Permissions } = require('discord.js');

class DTbotCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: `dtping`,
            group: 'dtbotcmds',
            memberName: 'dtping',
            description: "Will check bot oing status.",
            examples: [ `${config.prefix}dtping` ],
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES'],
        });
    }

    async run(message, args){
        if (message.content.indexOf("dtping") === 0) {
            const msg = await message.channel.send('Pinging DT BOT Server.....');
            msg.edit(`Wow! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`);
        }
    }
}

module.exports = DTbotCommand;