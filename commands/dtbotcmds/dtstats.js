const commando = require('discord.js-commando');
const app = require('../../app.js');
const config = require('../../config.json');
const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const Discord = require('discord.js');
const { Client, Permissions } = require('discord.js');

class DTbotCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: `dtstats`,
            group: 'dtbotcmds',
            memberName: 'dtstats',
            description: "Gives some useful bot statistics",
            examples: [ `${config.prefix}dtstats` ],
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['MANAGE_MESSAGES'],
        });
    }

    async run(client, message, args, level){
        if (message.content.indexOf("dtstats") === 0) {
            var time = Date.now();
            const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
            const embed = new Discord.RichEmbed()
                .setColor('RED')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setTitle('BOT STATS')
                .addField(`Memory Usage`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
                .addField(`Uptime`, `${duration}`, true)
                .addField(`Commands`, `${client.commandsNumber}`, true)
                .addField(`Users`, `${client.users.filter(u => u.id !== '1').size.toLocaleString()}`, true)
                .addField(`Servers`, `${client.guilds.size.toLocaleString()}`, true)
                .addField(`Channels`, `${client.channels.size.toLocaleString()}`, true)
                .addField(`Discord.js`, `v${version}`, true)
                .addField(`Node`, `${process.version}`, true)
                .addField(`Bot Version`, `${client.version}`, true)
                .setFooter(`Time taken: ${Date.now() - time}ms`);
            message.channel.send({ embed });
        }
    }
}

module.exports = DTbotCommand;