require('dotenv').config();
const Discord = require('discord.js');

module.exports = {
    name: Discord.Events.MessageCreate,
    discord: true,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} msg 
     */
    async run(client, msg) {
        if (msg.channel.id !== process.env.discord_channel) return;
        if (msg.author.bot) return;

        if (msg.content.startsWith('/')) {
            msg.react('✅');
            await client.bot?.chat(msg.content);
        } else {
            msg.react('✅');
            await client.bot?.chat(`> [${msg.author.tag}] ${msg.content}`)
        }
    }
}