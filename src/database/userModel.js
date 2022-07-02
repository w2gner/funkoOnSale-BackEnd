const mongoose = require('mongoose');

var users = new mongoose.Schema({
    name: String,
    user: String,
    password: String,
    funkos: [{ id: Number, description: String, value: Number, url: String, sale: Boolean }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('users', users);