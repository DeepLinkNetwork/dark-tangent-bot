const commando = require('discord.js-commando');
const app = require('../../app.js');
const config = require('../../config.json');
const Discord = require('discord.js');
const util = require('util');
const { Client, Permissions } = require('discord.js');

class DTbotCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: `dtsay`,
            group: 'dtbotcmds',
            memberName: 'dtsay',
            description: "Send a message to a channel through the bot.",
            examples: [ `${config.prefix}dtsay Hello this msg will get repeated.` ],
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR']
        });
    }

    async run(message, args){
        var msg = message.content;

        try {
            msg = msg.substring(msg.indexOf("dtsay") + 5);
        } catch(error) {
            console.log(error);
            return;
        }


        if(!msg || msg.length <= 0) {
            const embed = new Discord.RichEmbed()
                .addField(":x: Failed to repeat", "Wrong Message Length")
                .addField(":eyes: Listen up!", "Message length should be greater than 0 Chars.");
            message.channel.send({ embed: embed });
            return;
        }
        
        message.delete().catch(function (O_o) {});
        await sleep(500);
        message.channel.send(msg);
        return;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = DTbotCommand;