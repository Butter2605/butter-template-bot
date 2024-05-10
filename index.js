//require('events').EventEmitter.setMaxListeners(100)
require('dotenv').config();
const Discord = require('discord.js');
const mineflayer = require('mineflayer');
const tps = require('mineflayer-tps')(mineflayer);
const fs = require('fs')
const env = process.env
const { messages, colorCodes, blacklist } = require('./config.json')
const ms = require('ms')
const { codeBlock } = require('@discordjs/builders')
//const deathEvent = require('mineflayer-death-event')

const client = new Discord.Client({
    intents: 34315,
});

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

    fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
    .forEach(file => {
        const pull = require(`./commands/${file}`);
        if (pull.name) {
            bot.commands.push(pull);
        }
    })

    bot.on('end', (r) => {
        if (r.trim() == 'Under maintenance.') {
            setTimeout(() => run(client), 60 * 1000);
        } else {
            setTimeout(() => run(client), 60 * 1000);
        }
    });

    bot.on('error', () => {
        setTimeout(() => run(client), 60 * 1000);
    });

    bot.on('windowOpen', (window) => {
        window.requiresConfirmation = false;

        if (window.slots.length >= 62) {
            bot.simpleClick.leftMouse(13)
        }
    });

    bot.on('login', () => {
        setTimeout(() => { bot.activateItem(false) }, ms('12s'));
    });

    bot.on('messagestr', async(msg) => {
        console.log(msg)
        if (msg.trim() === '') return;
        if (msg.trim() === 'Hãy nhập lệnh : /login < mật khẩu của bạn> để vào server')
        {
            bot.chat(`/login ${config.password}`)
        } else if (msg.trim() === 'Hãy đăng ký tài khoản bằng lệnh : /register <mật khẩu bạn muốn đặt> <nhập lại mật khẩu')
        {
            bot.chat(`/register ${config.password} ${config.password}`);
        }
    });

    bot.on('login', () => {
        setInterval(() => {
            let randomChat = messages[Math.floor(Math.random() * messages.length)];
            bot.chat(`> ${randomChat}`)
        }, 2 * 60 * 1000 + (Math.floor(Math.random() * 400)))
    })

    bot.on('chat', async(user, msg) => {
        let discordRegex = /(https:\/\/)(discord gg)\//g;
        let edited = msg;
        if (user in blacklist) return;
        if (discordRegex.test(msg)) edited = msg.replace(discordRegex, 'https://discord.gg/');
        const channel = await client.channels.cache.get(config.id);
        if (!channel) return;

        const embed = new Discord.MessageEmbed()
            .setColor('#f836ff')
        	.setTitle(user)
            .setDescription(`**\`${edited}\`**`);
        
        await channel.send({ embeds: [embed] });
        

    })

    bot.on('chat', async(user, chat) => {
        const prefix = config.prefix;
        let msg = chat.toString();
        if (msg.trim() == bot.username) return bot.chat(`Prefix: ${prefix} | Dùng ${prefix}help để biết thêm thông tin về các lệnh`)
        if (
            !msg.trim().startsWith(prefix) ||
            !msg.trim().startsWith(`> ${prefix}`) ||
            !msg.trim().startsWith(`>${prefix}`)
        ) return;
        const args = msg.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const command = await bot.commands.find(c => c.name == cmd);
        if (command) {
            if (command.admin && user.trim() !== 'NDTung') return
            command.run(bot, user, msg, args);
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
