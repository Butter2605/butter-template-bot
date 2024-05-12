const fs = require('fs');
const mineflayer = require('mineflayer')

module.exports = {
    name: 'help',
    description: 'Xem toàn bộ lệnh của bot',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user
     * @param {String[]} args 
     */
    async run(bot, user, args) {
        if (!args[0]) {
            const files = await bot.commands.filter(cmd => cmd.name && (!cmd.admin || cmd.admin == false)).map(c => c.name);
            bot.chat('Hiện tại có các lệnh: ' + files.join(', '));
        } else {
            const cmd = await bot.commands.find(c => c.name == args[0]);
            if (!cmd) return bot.whisper(user, `Không có lệnh ${args[0]}`);
            bot.whisper(user,
                `Lệnh: ${cmd.name} - Mô tả: ${cmd.description}`
            )
        }

    }
}
