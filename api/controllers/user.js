/** @namespace application.app.controllers.user**/
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = function (app) {
    const security = app.security.JWT;
    const bcrypt = require('bcrypt');
    const db = app.connection.database.open();
    const salt = bcrypt.genSaltSync(10);
    return {
        create: async function (req, res){
            let sql = 'INSERT INTO user SET ?';
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
            let sql = 'SELECT * FROM user WHERE email = ?';
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
                }
            });
        }
    }
}