const mineflayer = require('mineflayer');
const ms = require('ms')
const { client } = require('../index');

module.exports = {
    name: 'error',
    async run(bot) {
        console.log('Bot got error. Reconnecting...');
        setTimeout(() => run(client), ms('30s'));
    }
}