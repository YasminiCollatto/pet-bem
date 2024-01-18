/** @namespace application.app.controllers.pet**/

module.exports = function (app) {
    const security = app.security.JWT;
    const db = app.connection.database.open();

    return {
        create: async function (req, res){
            let sql = 'INSERT INTO pets SET ?';
            let data = req.body;
            let userEmail = security.getUserId(req)
            data.dono = userEmail;
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
                res.status(500).send(e)
            }
        },
        list: async function(req, res) {
            let sql = 'SELECT * FROM pets WHERE dono = ?';
            let userEmail = security.getUserId(req)
            db.query(sql, userEmail, (err, results) => {
                if (err) throw err;
                res.json(results)
            });
        },
        get: async function (req, res){
            let userEmail = security.getUserId(req)
            let sql = `SELECT *
                   FROM pets
                   WHERE dono = ? and  id = ${req.params.id}`;

            db.query(sql, userEmail, (err, result) => {
                if (err) throw err;
                res.send(result);
            });
        },
        update: async function (req, res){
            let token = security.getToken(req);
            let userEmail = security.getUserId(token);
            if (userEmail){
                if (userEmail == req.params.id) {
                    let sql = `UPDATE pets
                    SET ?
                    WHERE id = ${req.params.id} and dono = ?`;
                    let data = req.body;

                    db.query(sql, userEmail, data, (err, result) => {
                        if (err) throw err;
                        res.json({msg: 'Pet atualizado com sucesso!'});
                    });
                }
            }

        },
        remove: async function (req, res){
            let userEmail = security.getUserId(req);
            if (userEmail) {
                if (userEmail == req.params.email) {
                    let sql = `DELETE
                               FROM pets
                               WHERE ?`;
                    let data = {
                        id: req.params.id,
                        dono: userEmail
                    }

                    db.query(sql, data, (err, result) => {
                        if (err) throw err;
                        res.json({msg: 'Pet excluído com sucesso!'});
                    });
                }
            }
        },
    }
}