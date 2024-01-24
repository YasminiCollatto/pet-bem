/** @namespace application.app.controllers.pets**/

const utf8 = require("utf8");
module.exports = function (app) {
    const security = app.security.JWT;
    const tableName = 'pets';
    const db = app.connection.database.open(tableName);
    const utf8 = require('utf8')

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
            let sql = `SELECT pets.id,nome,idade,descricao as raca FROM ${tableName} INNER JOIN racas ON pets.raca = racas.id WHERE ?`;
            let data = {
                email: userEmail
            }
            db.query(sql, data, (err, results) => {
                if (err) throw err;
                let response = JSON.parse(utf8.decode(JSON.stringify(results)));
                res.json(response)
            });
        },
        get: async function (req, res){
            let userEmail = await security.getUserId(req)
            let sql = `SELECT *
                   FROM ${tableName}
                   WHERE email = ? and  id = ${req.params.id}`;

            db.query(sql, userEmail, (err, results) => {
                if (err) throw err;
                let response = JSON.parse(utf8.decode(JSON.stringify(results)));
                res.json(response)
            });
        },
        update: async function (req, res){
            let userEmail = await security.getUserId(req);
            let sql = `UPDATE ${tableName} SET ? WHERE id = ${req.params.id} and email = "${userEmail}"`;
            let data = req.body;

            db.query(sql, data, (err, result) => {
                if (err) throw err;
                res.json({msg: 'Pet atualizado com sucesso!'});
            });

        },
        remove: async function (req, res){
            let userEmail = await security.getUserId(req);

            let sql = `DELETE
                               FROM ${tableName}
                               WHERE id=${req.params.id} and ?`;


            db.query(sql, {email: userEmail}, (err, result) => {
                console.info(result)
                if (err) throw err;
                console.log(`${userEmail} excluiu o pet id ${req.params.id}`)
                res.json({msg: 'Pet excluído com sucesso!'});
            });
        },
        listRacas: async function(req, res) {
            let tipo = req.params.tipo
            let sql = `SELECT * FROM racas WHERE ?`;
            let data = {
                tipo: tipo
            }

            db.query(sql, data, (err, results) => {
                if (err) throw err;
                let response = utf8.decode(JSON.stringify(results))
                res.json(JSON.parse(response))
            });
        },
    }
}
