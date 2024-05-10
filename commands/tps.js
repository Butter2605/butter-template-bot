const mineflayer = require('mineflayer')

module.exports = {
    name: 'tps',
    description: 'Xem TPS (ticks per second) của server',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} msg 
     * @param {String[]} args 
     */
    async run(bot, user, msg, args) {
        const str = bot.tablist.footer.toString();
        let tpsStr = str.trim().substring(16, str.indexOf(' tps'))

        let tps = tpsStr == 'Perfect' ? 20 : Number(tpsStr);

        bot.whisper(user, `TPS (tablist): ${tps}`)

    }
}