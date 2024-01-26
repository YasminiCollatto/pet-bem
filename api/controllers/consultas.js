/** @namespace application.app.controllers.consultas**/

const utf8 = require("utf8");
module.exports = function (app) {
    const security = app.security.JWT;
    const tableName = 'consultas';
    const db = app.connection.database.open(tableName);
    const utf8 = require('utf8')

    return {
        create: async function (req, res) {
            let sql = `INSERT INTO ${tableName}
                       SET ?`;
            let data = req.body;
            let userEmail = await security.getUserId(req)
            try {
                db.query(sql, data, (err, result) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send(err)
                    } else {
                        res.status(201).json({
                            msg: 'Cadastrado com sucesso!'
                        });
                    }

                });
            } catch (e) {
                res.status(500).send(e)
            }
        },
        list: async function (req, res) {
            let userEmail = await security.getUserId(req);
            let sql = `SELECT c.id, c.titulo, c.tipo, c.data, c.descricao,email, nome as pet
                       FROM ${tableName} AS c INNER JOIN pets ON pets.id = c.pet
                       WHERE ?`;
            let data = {
                email: userEmail
            }
            db.query(sql, data, (err, results) => {
                if (err) throw err;
                res.json(results)
            });
        },
        get: async function (req, res) {
            let userEmail = await security.getUserId(req)
            let sql = `SELECT c.*,email
                       FROM ${tableName} AS c LEFT JOIN pets ON pets.id = pet
                       WHERE email = ?
                         and c.id = ${req.params.id}`;

            db.query(sql, userEmail, (err, results) => {
                if (err) throw err;
                res.json(results)
            });
        },
        update: async function (req, res) {
            let userEmail = await security.getUserId(req);
            let sql = `UPDATE ${tableName} as c LEFT JOIN pets AS p ON p.id = pet
                       SET ? 
                       WHERE c.id = ${req.params.id}
                         and email = "${userEmail}"`;
            let data = req.body;
            data['c.id'] = req.body.id
            data['c.tipo'] = req.body.tipo
            delete data.tipo;
            delete data.id;

            db.query(sql, data, (err, result) => {
                if (err) throw err;
                res.json({msg: 'Atualizado com sucesso!'});
            });

        },
        remove: async function (req, res) {
            let userEmail = await security.getUserId(req);

            let sql = `DELETE c
                       FROM ${tableName} AS c LEFT JOIN pets ON pets.id = pet
                       WHERE c.id = ${req.params.id}
                         and ?`;


            db.query(sql, {email: userEmail}, (err, result) => {
                console.info(result)
                if (err) throw err;
                res.json({msg: 'Excluído com sucesso!'});
            });
        }
    }
}
