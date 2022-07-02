var mongoose = require('mongoose');
var User = require('./userModel.js');

module.exports = function insert(req) {
  mongoose.connect('mongodb://localhost:27017/funkodb');
  var new_user = new User({
    name: req.body.name,
    user: req.body.user,
    password: req.body.password,
    // funkos: [getFunkos(req).forEach.toString()]
    funkos: [{ id: req.body.funkos[0].id, description: req.body.funkos[0].description, value: 1, url: "String", sale: false }]
    // funkos: [req.body.funkos.forEach(funko => {
    //   return {
    //     id: funko.id,
    //     description: funko.description,
    //     value: funko.value,
    //     url: funko.url,
    //     sale: funko.sale
    //   }
    // })]
  });

  console.log(new_user);
  new_user.save(function (err) {
    if (err) console.log(err);
  });
}

function getFunkos(req) {
  let funko = new Array();
  req.body.funkos.forEach(req => {
    funko.push({
      id: req.id,
      description: req.description,
      value: req.value,
      url: req.url,
      sale: req.sale
    })
  });
  return [funko.array.forEach(x => {
    funko.at(x);
  })];
}

//{ id: Number, descricao: String, valor: Number, url: String, sale: Boolean }