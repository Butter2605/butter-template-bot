const mineflayer = require('mineflayer');
const ms = require('ms')
const { client } = require('../index')

module.exports = {
    name: 'end',
    async run(bot) {
        console.log('Bot ended. Reconnecting...');
        setTimeout(() => run(client), ms('30s'));
    }
}