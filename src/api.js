import fetch from 'node-fetch';
import express, { response } from 'express';
import insertUser from './mongoDB.js';
// import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017");
mongoose.connection.on("connected", function () {
    console.log("Conectou ao banco")
});

let app = express();

app.get('/heroes', function (req, res, next) {
    let request = fetch("https://akabab.github.io/superhero-api/api/all.json")
    let heroName = req.query.name;
    let found = false;

    request.then(function (response) {
        if (heroName) {
            return response.json().then(function (data) {
                let hero = data.find(function (hero) {
                    if (hero.name === heroName && !found) {
                        res.json(hero);
                        found = true;
                        request.finally(console.log("Herói encontrado"));
                    }
                });
                if (hero == undefined && !found) {
                    res.status(404).json({
                        error: "Herói não encontrado"
                    });
                }
            });
        }
        else {
            return response.json().then(function (data) {
                res.json(data);
            });
        }
    })
});

app.get('/occupation', function (req, res, next) {
    let request = fetch("https://akabab.github.io/superhero-api/api/all.json")
    let heroName = req.query.name;
    let found = false;

    request.then(function (response) {
        if (heroName) {
            return response.json().then(function (data) {
                let hero = data.find(function (hero) {
                    if (hero.name === heroName && !found) {
                        res.json(hero.work.occupation);
                        found = true;
                        request.finally(console.log("Herói encontrado"));
                    }
                });
                if (hero == undefined && !found) {
                    res.status(404).json({
                        error: "Herói não encontrado"
                    });
                }
            });
        }
        else {
            return response.json().then(function (data) {
                res.json(data);
            });
        }
    })
});

app.get('/images', function (req, res, next) {
    let request = fetch("https://akabab.github.io/superhero-api/api/all.json")
    let heroName = req.query.name;
    let found = false;

    request.then(function (data) {
        if (heroName) {
            return data.json().then(function (data) {
                let hero = data.find(function (hero) {
                    if (hero.name === heroName && !found) {
                        res.json(hero.images.lg);
                        found = true;
                        //buscar uma forma de encerrar a promise do request
                        request.finally(console.log("Herói encontrado"));
                    }
                });
                if (hero == undefined && !found) {
                    res.status(404).json({
                        error: "Herói não encontrado"
                    });
                }
            });
        } else if (heroName != undefined) {
            res.status(404).json({
                error: "Herói não encontrado"
            });
        } else {
            res.status(404).json({
                error: "Envie o parâmetro 'name'"
            });
        }
    })
});

app.post('/login', function (req, res, next) {
    let root = "root";
    let rootPassword = "unesc@1234";
    let email = req.headers.email;
    let password = req.headers.password;

    if (!email || !password) {
        if (!email && !password) {
            res.status(404).json({
                email: "Informe o email",
                password: "informe a senha"
            })
        } else if (!email) {
            res.status(404).json({
                email: "Informe o email"
            })
        } else {
            res.status(404).json({
                password: "Informe a senha"
            })
        }
    }
    else if (req.headers.email == root & req.headers.password == rootPassword) {
        res.status(200).json({ sucesso: "Usuário logado" });
    }
    else {
        res.status(404).json({ erro: "Usuário não encontrado" });
    }
});

app.post('/register', function (req, res, next) {
    const name = req.headers.name;
    const user = req.headers.user;

    insertUser(name, user);
    res.status(200).json({ sucesso: "Usuário registrado" });
});

app.listen(4000, function () {
    console.log('Server started on port 4000');
});

function insertUser(name, user) {
    const password = "teste123"

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