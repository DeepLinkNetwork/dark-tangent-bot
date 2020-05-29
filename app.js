const dotenv = require('dotenv');
const config = require('./config.json');
dotenv.config();

const Discord = require('discord.js');
const figlet = require('figlet');
const colors = require('colors');
const readline = require('readline');
const commando = require(`discord.js-commando`);

const bot = new commando.Client({
    commandPrefix: process.env.PREFIX || config.prefix,
    owner: process.env.OWNER_ID || config.id,
});

bot.on("ready", () => {
    clear();
    console.log(`Logged in as ${bot.user.tag}! (${bot.user.id})`);
    console.log('_________________________________________')
    bot.user.setActivity('For DarkTangent', { url: "https://github.com/DeepLinkNetwork/dark-tangent-bot", type: 'Watching' })
        .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
    
});

bot.on("error", (error) => {
    bot.login(process.env.BOT_TOKEN || config.token);
});

bot.on("disconnected", function () {
    // alert the console
    console.log("Disconnected from server ...");

    console.log("Reconnecting to Discord in 2 second...");
    setInterval(function() {
        bot.login(process.env.BOT_TOKEN || config.token);
    }, 2000);
});

bot.on('message', function(message) {
    const regex = /buyer/img;
    const str = message.content;
    let m;

    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        var r = m.some(function(match, groupIndex) {
            //console.log(`Found slag key match, group ${groupIndex}: ${match}`);
            //console.log(`message.channel.id => ${message.channel.id}`);
            if(match == 'buyer' && message.channel.id == config.general_chat_id) {
                if (message) message.delete();
                const embed = new Discord.RichEmbed()  
                .setAuthor(`${message.author.username} has been warned`, message.author.avatarURL)
                .setDescription('**Reason:** You are not allowed to sell anything in the server.')
                .setTimestamp()
                .setFooter('From DarkTangent Team', 'https://www.risingcup.com/assets/images/dt_logo.png');
                message.channel.send({ embed: embed });
                return true;
            }
        });
        if(r) break;
    }

    //Restricted Keywords
    let keywords = ['id','pass','need','players'];
    for (let index = 0; index < keywords.length; index++) {
        const element = new RegExp(keywords[index],'img');
        let closeLoop = false;
        while ((m = element.exec(str)) !== null) {
            if (m.index === element.lastIndex) {
                element.lastIndex++;
            }
            var r = m.some(function(match, groupIndex) {
                //console.log(`Found slag key match, group ${groupIndex}: ${match}`);
                if(message.channel.id == config.general_chat_id) 
                {
                    if (message) message.delete();
                    const embed = new Discord.RichEmbed()  
                    .setAuthor(`${message.author.username} has been warned`, message.author.avatarURL)
                    .setDescription(`**Reason:** Keywords such as **id**, **pass**, **need**, **player** is restricted in public_chat, post such message in  ☛  <#650316706194915370>`)
                    .setTimestamp()
                    .setFooter('From DarkTangent Team', 'https://www.risingcup.com/assets/images/dt_logo.png');
                    message.channel.send({ embed: embed });
                    return true;
                }
            });
            if(r) {
                closeLoop = r;
                break;
            }
        }
        if(closeLoop)
            break;
    }
});

// also, reconnect the bot hourly.
setInterval(function() {
    console.log(`Reconnecting to server per timeout of ${config.reconnect} ms.`);
    bot.destroy();
    bot.login(process.env.BOT_TOKEN || config.token);
}, config.reconnect);

bot.on('guildMemberAdd', member => {
    member.send(`**Hello ${member.user} Welcome To  DarkTangent Esports Server**               

** :white_check_mark: Make sure you must Read <#650318943101124639> :100: 

:white_check_mark: Also take Self Role From <#650319956424261632> :100: 

:white_check_mark:  Use <#650308208304586784> to chat with us :100: **

**:checkered_flag: Regards**
**:checkered_flag: DarkTangent Esports**

**__:hash:DarkTangent Esports__:hash: Copyright :copyright: 2020. All Rights Reserved**`);
 });

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

bot.registry.registerGroup('dtbotcmds', 'help');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.login(process.env.BOT_TOKEN || config.token);


function clear() {
    console.clear();
    console.log(figlet.textSync("DarkTangent Bot v1.0").green);
    console.log(`>Type  ${process.env.PREFIX || config.prefix}help  in a chat.\n\n`);
}