const mineflayer = require('mineflayer');
const { messages } = require('../config.json');
const ms = require('ms')

module.exports = {
    name: 'kick',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     */
    async run(bot) {
        setTimeout(() => { bot.activateItem(false) }, ms('12s'));
    }
}