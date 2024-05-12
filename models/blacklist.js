const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    username: String
});

module.exports = mongoose.model('livechat', schema)