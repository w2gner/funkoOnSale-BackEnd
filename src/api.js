import fetch from 'node-fetch';
import express from 'express';

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
    let email = req.query.email;
    let password = req.query.password;

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
    else if (req.query.email == root & req.query.password == rootPassword) {
        res.status(200).json({ sucesso: "Usuário logado" });
    }
    else {
        res.status(404).json({ erro: "Usuário não encontrado" });
    }
});

app.listen(4000, function () {
    console.log('Server started on port 4000');
});