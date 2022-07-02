const express = require('express');
const insert = require('./database/insert');
const select = require('./database/select');

let app = express();
app.use(express.json());

app.get('/users', function (req, res, next) {
    let users = select();
    res.status(200).json(users != undefined ? { Users: users } : { Users: "Não há usuários cadastrados" });
});

app.post('/users', function (req, res, next) {
    insert(req);
    res.status(200).json({ sucesso: "Usuário registrado" });
});

app.put('/users', function (req, res, next) {
    res.status(200).json({ sucesso: select() });
});


app.post('/login', function (req, res, next) {
    let root = "root";
    let rootPassword = "unesc@1234";
    let email = req.body.email;
    let password = req.body.password;

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

app.listen(4000, function () {
    console.log('Server started on port 4000');
});
