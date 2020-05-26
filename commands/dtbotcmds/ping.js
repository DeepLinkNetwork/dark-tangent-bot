const commando = require('discord.js-commando');
const app = require('../../app.js');
const config = require('../../config.json');
const Discord = require('discord.js');
const util = require('util');
const { Client, Permissions } = require('discord.js');

class DTbotCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: `ping`,
            group: 'dtbotcmds',
            memberName: 'ping',
            description: "Will check bot oing status.",
            examples: [ `${config.prefix}ping` ],
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES'],
        });
    }

    async run(message, args){
        if (message.content.indexOf("ping") === 0) {
            const msg = await message.channel.send('Ping?');
            msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`);
        }
    }
}

module.exports = DTbotCommand;