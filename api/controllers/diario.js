/** @namespace application.app.controllers.diario**/
module.exports = function (app) {
    const security = app.security.JWT;
    const tableName = 'diario';
    const db = app.connection.database.open(tableName);
    const utf8 = require('utf8')

    return {
        create: async function (req, res) {
            let sql = `INSERT INTO ${tableName}
                       SET ?`;
            let data = req.body;
            data.email = await security.getUserId(req);
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
            let sql = `SELECT *
                       FROM ${tableName}
                       WHERE ?`;
            let data = {
                email: userEmail
            }
            db.query(sql, data, (err, results) => {
                if (err) throw err;
                let response = JSON.parse(utf8.decode(JSON.stringify(results)));
                res.json(response)
            });
        },
        get: async function (req, res) {
            let userEmail = await security.getUserId(req)
            let sql = `SELECT *
                       FROM ${tableName}
                       WHERE email = ?
                         and id = ${req.params.id}`;

            db.query(sql, userEmail, (err, results) => {
                if (err) throw err;
                let response = JSON.parse(utf8.decode(JSON.stringify(results)));
                res.json(response)
            });
        },
        update: async function (req, res) {
            let userEmail = await security.getUserId(req);
            let sql = `UPDATE ${tableName}
                       SET ?
                       WHERE id = ${req.params.id}
                         and email = "${userEmail}"`;
            let data = req.body;

            db.query(sql, data, (err, result) => {
                if (err) throw err;
                res.json({msg: 'Atualizado com sucesso!'});
            });

        },
        remove: async function (req, res) {
            let userEmail = await security.getUserId(req);

            let sql = `DELETE
                       FROM ${tableName}
                       WHERE id = ${req.params.id}
                         and ?`;


            db.query(sql, {email: userEmail}, (err, result) => {
                if (err) throw err;
                res.json({msg: 'Excluído com sucesso!'});
            });
        }
    }
}
