const mineflayer = require('mineflayer');

module.exports = {
    name: 'chat',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} chat 
     * @returns 
     */
    async run(bot, user, chat) {
        const prefix = '!';
        let msg = chat.toString();
        let args = msg.split(/ +/g);
        if (args[0] === '>') args = args.slice(1);
        if (!args[0]) return
        if (!args[0].startsWith(prefix)) return
        args[0] = args[0].slice(prefix.length)
        const cmd = await bot.commands.find(cmd => cmd.name === args[0]);
        if (!cmd) return
        if (user === bot.player.username)
            await require('node:timers/promises').setTimeout(1000).catch(e =>{});
        delete args[0];

        cmd.run(bot, user, args);
    }
}