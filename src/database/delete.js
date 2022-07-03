const mongoose = require('mongoose');
const User = require('./userModel.js');

module.exports = async function deleteUser(req, callback) {
    await mongoose.connect('mongodb://localhost:27017/funkodb');
    let id = req.params.id;

    User.findByIdAndDelete(id, function (error, result) {
        if (error) {
            console.log(error);
            callback(null);
        } else {
            console.log(result);
            callback(result);
        }
    });
}