const mongoose = require('mongoose');
const Users = require('./userModel.js');

module.exports = async function select(callback) {
    await mongoose.connect('mongodb://localhost:27017/funkodb');

    Users.find({}, function (error, data) {
        if (error) {
            console.log(error);
        } else {
            mongoose.connection.close();
            callback(data);
        }
    });
}