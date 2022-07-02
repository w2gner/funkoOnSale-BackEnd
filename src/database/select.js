var mongoose = require('mongoose');
var User = require('./userModel.js');

module.exports = function select() {
    var db = mongoose.createConnection('mongodb://localhost:27017/funko');
    db.on('error', console.error.bind(console, 'connection error:'));
    var a1 = db.once('open', function () {
        User.find({}, {}, function (err, users) {
            mongoose.connection.close();
            console.log("Usuários salvos: " + JSON.stringify(users))
            return JSON.stringify(users);
        })
    });

}