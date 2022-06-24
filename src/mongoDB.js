const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017");

mongoose.connection.on("connected", function () {
    console.log("Conectou ao banco")
});

var blogShema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date, default: [] }],
    date: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogShema);

var post = new Blog({
    title: "Olá!",
    author: "Wagner Ghedin",
    body: "Seja bem vindo",
});

post.save(function (err) {
    if (!err) {
        console.log("Objeto salvo com sucesso!");
    }
});