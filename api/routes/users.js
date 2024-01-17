const bodyParser = require('body-parser');
const cors = require('cors');



module.exports = function (app) {

    const config = app.config.vars;
    console.log(config.prefix)

    app.post(`${config.prefix}/user`, (req, res) => {
        const db = app.connection.database.open();
        let sql = 'INSERT INTO user SET ?';
        let data = req.body;
        try {
            db.query(sql, data, (err, result) => {
                if (err) {
                    res.send('Cadastrado com sucesso!');
                }

            });
        } catch (e) {
            res.status(500).send("Usuário existente!")
        }

    });

    // Recuperar todos os animais
    app.post(`${config.prefix}/login`, (req, res) => {
        const db = app.connection.database.open();
        let sql = 'SELECT * FROM user WHERE ?';
        let data = req.body;
        db.query(sql, data, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

    app.get(`${config.prefix}/users`, (req, res) => {
        const db = app.connection.database.open();
        let sql = 'SELECT * FROM user';

        db.query(sql, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

    // Recuperar um animal específico por ID
    app.get(`${config.prefix}/user/:id`, (req, res) => {
        let sql = `SELECT *
                   FROM animais
                   WHERE id = ${req.params.id}`;

        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

    // Atualizar um animal por ID
    app.put(`${config.prefix}/pet/:id`, (req, res) => {
        let sql = `UPDATE animais
                   SET ?
                   WHERE id = ${req.params.id}`;
        let data = req.body;

        db.query(sql, data, (err, result) => {
            if (err) throw err;
            res.send('Animal atualizado com sucesso!');
        });
    });

    // Excluir um animal por ID
    app.delete(`${config.prefix}/user/:email`, (req, res) => {
        const db = app.connection.database.open();
        let sql = `DELETE FROM user WHERE ?`;
        let data = {
            email: new String(req.params.email)
        }

        db.query(sql, data, (err, result) => {
            if (err) throw err;
            res.send('Animal excluído com sucesso!');
        });
    });
}