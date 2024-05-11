const mineflayer = require('mineflayer');
const ms = require('ms')
const { client } = require('../index');

module.exports = {
    name: 'login',
    async run(bot) {
        setTimeout(() => run(client), ms('30s'));
    }
}