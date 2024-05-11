const mineflayer = require('mineflayer');
const { messages } = require('../config.json');
const ms = require('ms')

module.exports = {
    name: 'login',
    async run(bot) {
        setTimeout(() => { bot.activateItem(false) }, ms('12s'));

        setInterval(() => {
            let randomChat = messages[Math.floor(Math.random() * messages.length)];
            bot.chat(`> ${randomChat}`)
        }, 1000*45)
    }
}