/** @namespace application.app.controllers.user**/

module.exports = function (app) {
    const security = app.security.JWT;
    const bcrypt = require('bcrypt');
    const jwt = require("jsonwebtoken");
    const db = app.connection.database.open();
    const salt = bcrypt.genSaltSync(10);
    return {
        create: async function (req, res){
            let sql = 'INSERT INTO users SET ?';
            let data = req.body;
            data.password = bcrypt.hashSync(data.password, salt);
            try {
                db.query(sql, data, (err, result) => {
                    if (err) {
                        throw new Error(err);
                    }
                    res.status(201).json({
                        msg: 'Cadastrado com sucesso!'
                    });
                });
            } catch (e) {
                res.status(500).send("Usuário existente!")
            }
        },
        login: async function(req, res) {
            console.log(2)
            let sql = 'SELECT * FROM users WHERE email = ?';
            let data = req.body;
            db.query(sql, data.email, (err, results) => {
                if (err) throw err;
                // bcrypt.compareSync(pass, userFound.password);
                if (results.length) {
                    let valid = bcrypt.compareSync(data.password, results[0].password);
                    if (valid) {
                        let _id = data.email;
                        let token = jwt.sign({_id}, process.env.SECRET || "dev", {
                            expiresIn: 43200 // expires in 12 hours
                        });
                        res.json({token: token})
                    } else {
                        res.status(403).send("Não autorizado");
                    }
                } else {
                    res.status(403).send("Não autorizado");
                }
            });
        },
        get: async function (req, res){
            let sql = `SELECT name
                   FROM user
                   WHERE email = ${req.params.email}`;

            db.query(sql, (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        },
        update: async function (req, res){
            let userEmail = security.getUserId(req);
            if (userEmail){
                if (userEmail == req.params.email) {
                    let sql = `UPDATE users
                   SET ?
                   WHERE email = ${req.params.email}`;
                    let data = req.body;

                    db.query(sql, data, (err, result) => {
                        if (err) throw err;
                        res.json({msg: 'Usuário atualizado com sucesso!'});
                    });
                }
            }

        },
        remove: async function (req, res){
            let userEmail = security.getUserId(req);
            if (userEmail) {
                if (userEmail == req.params.email) {
                    let sql = `DELETE
                               FROM users
                               WHERE ?`;
                    let data = {
                        email: new String(req.params.email)
                    }

                    db.query(sql, data, (err, result) => {
                        if (err) throw err;
                        res.send('Usuário excluído com sucesso!');
                    });
                }
            }
        },
    }
}