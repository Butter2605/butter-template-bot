require('dotenv').config();
const Discord = require('discord.js');
const mineflayer = require('mineflayer');
const tps = require('mineflayer-tps')(mineflayer);
const fs = require('fs')
const env = process.env
const { codeBlock } = require('@discordjs/builders');

const client = new Discord.Client({
    intents: 34315,
});

module.exports = { client }

const config = {
    ip: env.mc_ip,
    username: env.mc_username,
    password: env.mc_password,
    token: env.discord_token,
    id: env.discord_channel,
    prefix: env.prefix
}

/**
 * 
 * @param {Discord.Client} client 
 */
function run(client) {

    const bot = mineflayer.createBot({
        host: config.ip,
        username: config.username,
        version: '1.16.5',
        hideErrors: true
    });

    bot.loadPlugin(tps)
    bot.commands = [];
    bot.discordClient = client;

    fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
    .forEach(file => {
        const pull = require(`./commands/${file}`);
        if (pull.name) {
            bot.commands.push(pull);
        }
    })

    fs.readdirSync('./events').filter(file => file.endsWith('.js'))
    .forEach(file => {
        const event = require(`./events/${file}`);
        if (event.name) {
            bot.on(event.name, (...args) => event.run(bot, ...args));
        }
    })

    client.on('messageCreate', async(msg) => {
        if (msg.channel.id !== config.id) return;
        if (msg.author.bot) return;

        if (msg.content.startsWith('/')) {
            msg.react('✅');
            await bot?.chat(msg.content);
        } else {
            msg.react('✅');
            await bot?.chat(`> [${msg.author.tag}] ${msg.content}`)
        }
    })
    
}

client.once('ready', () => {
    console.log('Đã đăng nhập Discord');
    client.user.setActivity('tung4402', { type: 'LISTENING' });
    run(client)
});

client.login(config.token);
