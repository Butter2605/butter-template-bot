require('dotenv').config();
const mineflayer = require('mineflayer');
const config = { password: process.env.mc_password }
const ms = require('ms')

module.exports = {
    name: 'messagestr',
    async run(bot, msg) {
        console.log(msg)
        if (msg.trim() === '') return;
        if (msg.trim() === 'Hãy nhập lệnh : /login < mật khẩu của bạn> để vào server')
        {
            bot.chat(`/login ${config.password}`)
        } else if (msg.trim() === 'Hãy đăng ký tài khoản bằng lệnh : /register <mật khẩu bạn muốn đặt> <nhập lại mật khẩu')
        {
            bot.chat(`/register ${config.password} ${config.password}`);
        }
    }
}