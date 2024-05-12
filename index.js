require('dotenv').config();
const Discord = require('discord.js');
const mineflayer = require('mineflayer');
const tps = require('mineflayer-tps')(mineflayer);
const fs = require('fs')
const env = process.env
const mongoose = require('mongoose');
const ms = require('ms');

const client = new Discord.Client({
    intents: 34315,
    allowedMentions: {
        repliedUser: false,
        roles: false,
        users: false,
        parse: true
    }
});

module.exports = { client }

const config = {
    ip: env.mc_ip,
    username: env.mc_username,
    token: env.discord_token,
    mongodb: env.mongodb
}

mongoose.connect(config.mongodb)
.then(() => { console.log('Connected to MongoDB') }).catch(e => {});

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
    client.bot = bot;

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
        if (event.discord) {
            client.on(event.name, (...args) => event.run(client, ...args));
        } else {
            bot.on(event.name, (...args) => event.run(bot, ...args));
        }
    })
    
}

client.once(Discord.Events.ClientReady, () => {
    console.log('Đã đăng nhập Discord');
    client.user.setActivity('tung4402', { type: 'LISTENING' });
    run(client)
});

client.login(config.token);
