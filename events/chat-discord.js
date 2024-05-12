require('dotenv').config();
const mineflayer = require('mineflayer');
const { blacklist } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'chat',
    async run(bot, user, msg) {
        if (blacklist.includes(user)) return;
        const channel = await bot.discordClient.channels.cache.get(process.env.discord_channel);
        if (!channel) return;

        const embed = new Discord.MessageEmbed()
            .setColor('#f836ff')
        	.setTitle(user)
            .setDescription(`**\`${msg}\`**`);
        
        await channel.send({ embeds: [embed] });
    }
}