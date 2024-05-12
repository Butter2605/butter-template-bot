const mineflayer = require('mineflayer')

module.exports = {
    name: 'tps',
    description: 'Xem TPS (ticks per second) của server',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String[]} args 
     */
    async run(bot, user, args) {
        const str = bot.tablist.footer.toString();
        let tpsStr = str.trim().substring(16, str.indexOf(' tps'))

        let tps = tpsStr == 'Perfect' ? 20 : Number(tpsStr);

        bot.chat(`> TPS (tablist): ${tps}`)

    }
}