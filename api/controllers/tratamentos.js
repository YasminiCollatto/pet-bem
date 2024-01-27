/** @namespace application.app.controllers.tratamentos**/
module.exports = function (app) {
    const security = app.security.JWT;
    const tableName = 'tratamentos';
    const db = app.connection.database.open(tableName);
    const utf8 = require('utf8')

    return {
        create: async function (req, res) {
            let sql = `INSERT INTO ${tableName}
                       SET ?`;
            let data = req.body;
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
            let sql = `SELECT t.*, email, nome as pet
                       FROM ${tableName} AS t
                                INNER JOIN pets ON pets.id = t.pet
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
            let sql = `SELECT t.*, email
                       FROM ${tableName} AS t
                                LEFT JOIN pets ON pets.id = pet
                       WHERE email = ?
                         and t.id = ${req.params.id}`;

            db.query(sql, userEmail, (err, results) => {
                if (err) throw err;
                let response = JSON.parse(utf8.decode(JSON.stringify(results)));
                res.json(response)
            });
        },
        update: async function (req, res) {
            let userEmail = await security.getUserId(req);
            let sql = `UPDATE ${tableName} AS t LEFT JOIN pets AS p
                       ON p.id = pet
                           SET ?
                       WHERE t.id = ${req.params.id}
                         and email = "${userEmail}"`;
            let data = req.body;
            data['t.id'] = req.body.id
            data['t.tipo'] = req.body.tipo
            delete data.tipo;
            delete data.id;

            db.query(sql, data, (err, result) => {
                if (err) throw err;
                res.json({msg: 'Atualizado com sucesso!'});
            });

        },
        remove: async function (req, res) {
            let userEmail = await security.getUserId(req);

            let sql = `DELETE
            t
                       FROM
            ${tableName}
            AS
            t
            LEFT
            JOIN
            pets
            ON
            pets
            .
            id
            =
            pet
            WHERE
            t
            .
            id
            =
            ${req.params.id}
            and
            ?`;


            db.query(sql, {email: userEmail}, (err, result) => {
                if (err) throw err;
                res.json({msg: 'Excluído com sucesso!'});
            });
        }
    }
}
