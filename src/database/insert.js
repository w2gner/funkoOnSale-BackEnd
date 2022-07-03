const mongoose = require('mongoose');
const User = require('./userModel.js');

module.exports = async function insert(req, callback) {
  await mongoose.connect('mongodb://localhost:27017/funkodb');
  let { name, user, password } = req.body;
  let { id, description, value, url, sale } = req.body.funkos[0];

  let
    query = { user: user },
    update = {
      updatedAt: new Date(),
      name: name,
      user: user,
      password: password,
      funkos: [{ id: id, description: description, value: value, url: url, sale: sale }]
    },
    options = { upsert: true, multi: true };

  let
    new_user = new User({
      name: name,
      user: user,
      password: password,
      funkos: [
        {
          id: id,
          description: description,
          value: value,
          url: url,
          sale: sale
        }]
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
}