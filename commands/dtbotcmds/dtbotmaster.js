const commando = require('discord.js-commando');
const app = require('../../app.js');
const config = require('../../config.json');
const Discord = require('discord.js');
const util = require('util');
const { Client, Permissions } = require('discord.js');

class DTbotCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: `dtbotmaster`,
            group: 'dtbotcmds',
            memberName: 'dtbotmaster',
            description: "I will tell who is my master.",
            examples: [ `${config.prefix}dtbotmaster` ],
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES'],
        });
    }

    async run(message, args){
        if (message.content.indexOf("dtbotmaster") === 0) {
            await sleep(1000);
            const embed = new Discord.RichEmbed()
            .addField(":eyes: My Master is Deepender Choudhary AkA @Deeקc๏ᖙe⚡#8743", "He Goes by ID 404953341622484995");
            message.channel.send({ embed: embed });
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = DTbotCommand;