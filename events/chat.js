const mineflayer = require('mineflayer');

module.exports = {
    name: 'chat',
    async run(bot, user, chat) {
        const prefix = '!';
        let msg = chat.toString();
        if (msg.trim() == bot.username) return bot.chat(`Prefix: ${prefix} | Dùng ${prefix}help để biết thêm thông tin về các lệnh`)
        if (!msg.trim().startsWith(prefix)) return;
        const args = msg.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const command = await bot.commands.find(c => c.name == cmd);
        if (command) {
            if (command.admin && user.trim() !== 'NDTung') return
            command.run(bot, user, msg, args);
        }
    }
}