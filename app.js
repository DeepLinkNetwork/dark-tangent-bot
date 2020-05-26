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

  // also, reconnect the bot hourly.
setInterval(function() {
    console.log(`Reconnecting to server per timeout of ${config.reconnect} ms.`);
    bot.destroy();
    bot.login(process.env.BOT_TOKEN || config.token);
}, config.reconnect);

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