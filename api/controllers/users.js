/** @namespace application.app.controllers.users**/
module.exports = function (app) {
    const security = app.security.JWT;
    const config = app.config.vars
    const bcrypt = require('bcrypt');
    const jwt = require("jsonwebtoken");
    const tableName = 'usuarios'
    const db = app.connection.database.open(tableName);
    const salt = bcrypt.genSaltSync(10);
    return {
        create: async function (req, res) {
            let sql = `INSERT INTO ${tableName}
                       SET ?`;
            let data = req.body;
            data.password = bcrypt.hashSync(data.password, salt);
            try {
                db.query(sql, data, (err, result) => {
                    if (err) {
                        Response.error(res, err)
                    }
                    Response.success(res, {
                        msg: 'Cadastrado com sucesso!'
                    })
                });
            } catch (e) {
                Response.error(res, e)
            }
        },
        login: async function (req, res) {
            let sql = `SELECT *
                       FROM ${tableName}
                       WHERE email = ?;`;
            let data = req.body;
            db.query(sql, data.email, (err, results) => {
                if (err) throw err;
                if (results.length) {
                    let valid = bcrypt.compareSync(data.password, results[0].password);
                    if (valid) {
                        let _id = data.email;
                        let token = jwt.sign({_id}, config.secret, {
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
        get: async function (req, res) {
            let userEmail = await security.getUserId(req);
            let sql = `SELECT *
                       FROM ${tableName}
                       WHERE email = "${userEmail}"`;

            db.query(sql, (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        },
        update: async function (req, res) {
            let userEmail = await security.getUserId(req);
            if (userEmail) {
                if (userEmail == req.params.email) {
                    let sql = `UPDATE ${tableName}
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
        remove: async function (req, res) {
            let userEmail = await security.getUserId(req);
            if (userEmail) {
                if (userEmail == req.params.email) {
                    let sql = `DELETE
                               FROM ${tableName}
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