const commando = require('discord.js-commando');
const app = require('../../app.js');
const config = require('../../config.json');
const Discord = require('discord.js');
const util = require('util');
const { Client, Permissions } = require('discord.js');

class DTbotCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: `dtlist`,
            group: 'dtbotcmds',
            memberName: 'dtlist',
            description: 'Display Total Member List',
            examples: [ `${config.prefix}dtlist` ],
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES'],
        });
    }

    async run(message, args){
        let dmGuild = message.guild;
        let memberarray = dmGuild.members.array();
        let membercount = memberarray.length;
        if (message.content.indexOf("dtlist") === 0) {
            await sleep(1000);
            message.channel.send(`Hey ${message.author.username}, There are now **${membercount}** members in **${dmGuild.name}**.`);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = DTbotCommand;