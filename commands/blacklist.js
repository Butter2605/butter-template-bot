const mineflayer = require('mineflayer')
const blacklist = require('../models/blacklist');

module.exports = {
    name: 'blacklist',
    admin: true,
    description: 'Add someone to blacklist',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user
     * @param {String[]} args 
     */
    async run(bot, user, args) {
        
    }
}