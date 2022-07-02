const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017");

function insertUser(name, user) {
    const password = "teste123"

    mongoose.connection.on("connected", function () {
        console.log("Conectou ao banco")
    });

    var funkoSchema = new mongoose.Schema({
        nome: String,
        user: String,
        senha: String,
        funkos: [{ id: Number, descricao: String, valor: Number, url: String, sale: Boolean }],
        date: { type: Date, default: Date.now }
    });
    
    var funko = mongoose.model("funko", funkoSchema);

    var post = new funko({
        nome: name,
        user: user,
        senha: password,
        funkos: [
            { id: 1, descricao: "String", valor: 15.5, url: "teste", sale: true },
            { id: 2, descricao: "String", valor: 15.5, url: "teste", sale: true }
        ],
    });

    post.save(function (err) {
        if (!err) {
            console.log("Objeto salvo com sucesso!");
        }
    });
}

export default insertUser;