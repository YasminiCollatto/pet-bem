
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



module.exports = function (app) {
    const config = app.config.vars;
    const userCtrl = app.controllers.user
    const security = app.security.JWT


    app.post(`${config.prefix}/user`, async (req, res) => {
        await userCtrl.create(req, res);
    });

    // Recuperar todos os animais
    app.post(`${config.prefix}/login`, async (req, res) => {
        await userCtrl.login(req,res);
    });

    app.get(`${config.prefix}/users`, (req, res) => { //todo: remover
        const db = app.connection.database.open();
        let sql = 'SELECT * FROM user';

        db.query(sql, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

    // Recuperar um animal específico por ID
    app.get(`${config.prefix}/user/:email`, (req, res) => {
        let sql = `SELECT name
                   FROM user
                   WHERE email = ${req.params.email}`;

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
    app.delete(`${config.prefix}/user/:email`, security.verifyJWT, (req, res) => {
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