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

    async run(message, args,){
        var time = Date.now();
        const duration = moment.duration(this.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
        const embed = new Discord.RichEmbed()
            .setColor('RED')
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setTitle('BOT STATS')
            .addField(`Memory Usage`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .addField(`Uptime`, `${duration}`, true)
            .addField(`Commands`, `${config.botCmds}`, true)
            .addField(`Users`, `${this.client.users.filter(u => u.id !== '1').size.toLocaleString()}`, true)
            .addField(`Servers`, `${this.client.guilds.size.toLocaleString()}`, true)
            .addField(`Channels`, `${this.client.channels.size.toLocaleString()}`, true)
            .addField(`Discord.js`, `v${version}`, true)
            .addField(`Node`, `${process.version}`, true)
            .addField(`Bot Version`, `${config.botversion}`, true)
            .addField(`Bot Creator`, `Mr Deepender Choudhary AKA @Deeקc๏ᖙe:zap:`, true)
            .setFooter(`Time taken: ${Date.now() - time}ms`);
        message.channel.send({ embed });
    }
}

module.exports = DTbotCommand;