/** @namespace application.app.controllers.pet**/

module.exports = function (app) {
    const security = app.security.JWT;
    const tableName = 'pets';
    const db = app.connection.database.open(tableName);

    return {
        create: async function (req, res){
            let sql = `INSERT INTO ${tableName} SET ?`;
            let data = req.body;
            let userEmail = await security.getUserId(req)
            data.email = userEmail;
            try {
                db.query(sql, data, (err, result) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send(err)
                    }else {
                        res.status(201).json({
                            msg: 'Cadastrado com sucesso!'
                        });
                    }

                });
            } catch (e) {
                res.status(500).send(e)
            }
        },
        list: async function(req, res) {
            let userEmail = await security.getUserId(req);
            let sql = `SELECT * FROM ${tableName} WHERE ?`;
            let data = {
                email: userEmail
            }
            db.query(sql, data, (err, results) => {
                if (err) throw err;
                res.json(results)
            });
        },
        get: async function (req, res){
            let userEmail = security.getUserId(req)
            let sql = `SELECT *
                   FROM ${tableName}
                   WHERE email = ? and  id = ${req.params.id}`;

            db.query(sql, userEmail, (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        },
        update: async function (req, res){
            let userEmail = security.getUserId(req);
            let sql = `UPDATE ${tableName}
                    SET ?
                    WHERE id = ${req.params.id} and email = ?`;
            let data = req.body;

            db.query(sql, userEmail, data, (err, result) => {
                if (err) throw err;
                res.json({msg: 'Pet atualizado com sucesso!'});
            });

        },
        remove: async function (req, res){
            let userEmail = security.getUserId(req);
            let sql = `DELETE
                               FROM ${tableName}
                               WHERE id= ${req.params.id} and email = ?`;


            db.query(sql, userEmail, (err, result) => {
                if (err) throw err;
                res.json({msg: 'Pet excluído com sucesso!'});
            });
        },
        listRacas: async function(req, res) {
            let tipo = req.params.tipo
            let sql = `SELECT * FROM racas WHERE ?`;
            let data = {
                tipo: tipo
            }
            const ut8 = require('utf8')
            db.query(sql, data, (err, results) => {
                if (err) throw err;
                const utf8 = require('utf8')
                let response = utf8.decode(JSON.stringify(results))
                res.json(JSON.parse(response))
            });
        },
    }
}