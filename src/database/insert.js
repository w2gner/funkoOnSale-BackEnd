const mongoose = require('mongoose');
const User = require('./userModel.js');

module.exports = async function insert(req, callback) {
  await mongoose.connect('mongodb://localhost:27017/funkodb');
  let { name, user, password } = req.body;
  let { id, description, value, url, sale } = req.body.funkos[0];

  let new_user = new User({
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

  new_user.save(function (error) {
    mongoose.connection.close();
    if (error) {
      console.log(err);
    } else {
      callback(new_user);
      console.log('Usuário salvo com sucesso', new_user);
    }
  });
}