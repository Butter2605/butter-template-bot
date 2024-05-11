require('dotenv').config();
const mineflayer = require('mineflayer');
const { blacklist } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'chat',
    async run(bot, user, msg) {
        let discordRegex = /(https:\/\/)(discord gg)\//g;
        let edited = msg;
        if (blacklist.includes(user)) return;
        if (discordRegex.test(msg)) edited = msg.replace(discordRegex, 'https://discord.gg/');
        const channel = await bot.discordClient.channels.cache.get(process.env.discord_channel);
        if (!channel) return;

        const embed = new Discord.MessageEmbed()
            .setColor('#f836ff')
        	.setTitle(user)
            .setDescription(`**\`${edited}\`**`);
        
        await channel.send({ embeds: [embed] });
    }
}