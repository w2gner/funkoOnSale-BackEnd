const mongoose = require('mongoose');
const { findOneAndUpdate } = require('./userModel.js');
const User = require('./userModel.js');

module.exports = async function insert(req, callback) {
  await mongoose.connect('mongodb://localhost:27017/funkodb');
  let { name, user, password } = req.body;
  let funkos = new Array();
  req.body.funkos.forEach(funko => {
    funkos.push(funko);
  });

  let
    query = { user: user },
    update = {
      updatedAt: new Date(),
      name: name,
      user: user,
      password: password,
      funkos: funkos
    },
    options = { upsert: true, multi: true };

  let
    new_user = new User({
      name: name,
      user: user,
      password: password,
      funkos: funkos
    });

  User.findOneAndUpdate(query, update, options, function (error, result) {
    if (!error) {
      if (!result) {
        result = new_user;
      }
      result.save(function (error) {
        if (error) {
          console.log(error);
          callback(null);
        } else {
          callback(result);
          console.log('Usuário salvo com sucesso', result);
        }
      });
    }
  });

  User.find(query, function (error, result) {
    if (error) {
      console.log(error);
    } else if (result.length > 1) {
      User.deleteOne(query, function (error) { })
    }
  });

  User.updateMany(query, { $set: { funkos: funkos } }, function (error, result) { });
}