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
        if(dmGuild) {
            let memberarray = dmGuild.members.array();
            let membercount = memberarray.length;
            await sleep(500);
            message.channel.send(`Hey ${message.author.username}, There are now **${membercount}** members in **${dmGuild.name}**.`);
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