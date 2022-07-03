const express = require('express');
const insert = require('./database/insert');
const select = require('./database/select');
const deleteUser = require('./database/delete');
const cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

app.get('/users', function (req, res, next) {
    select(function (data) {
        if (data.length > 0) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ response: "Nenhuma informação encontrada no banco de dados" });
        }
    });
});

app.post('/users', function (req, res, next) {
    insert(req, function (data) {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(500).json({ response: "Ocorreu erro ao salvar o usuário" });
        }
    });
});

app.delete('/users/:id', function (req, res, next) {
    deleteUser(req, function (data) {
        if (data) {
            res.status(204).send();
        } else {
            res.status(500).json("Ocorreu erro ao excluir o usuário");
        }
    })
});

app.post('/login', function (req, res, next) {
    let { email, password } = req.body;
    let login = false;

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
    } else {
        select(function (users) {
            users.forEach(user => {
                if (user.user == email && user.password == password) {
                    login = true;
                    res.status(200).json({ userId: user._id });
                }
            });
            if (!login) {
                res.status(404).json({ login: "Usuário não encontrado" });
            }
        })
    }
});

app.listen(4000, function () {
    console.log('Server started on port 4000');
});
