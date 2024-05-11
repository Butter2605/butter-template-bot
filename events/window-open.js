const mineflayer = require('mineflayer');

module.exports = {
    name: 'windowOpen',
    async run(bot, window) {
        window.requiresConfirmation = false;

        if (window.slots.length >= 62) {
            bot.simpleClick.leftMouse(13)
        }
    }
}