const mineflayer = require('mineflayer')

module.exports = {
    name: 'dupe',
    description: 'Nhân bản kit cho bạn',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user
     * @param {String[]} args 
     */
    async run(bot, user, args) {
        if (!args[0]) return bot.chat('Bạn phải nhập tên kit cần dupe')
        const kitName = args.join(' ');

        bot.chat(`Đã dupe cho ${user} kit ${kitName}`)
    }
}