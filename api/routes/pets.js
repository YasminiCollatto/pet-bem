const bodyParser = require('body-parser');
const cors = require('cors');



module.exports = function (app) {
    const db = app.connection.database.open();
    const config = app.config.vars;

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'content-type,x-access-token');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    app.post(`${config.prefix}/pet`, (req, res) => {
        let sql = 'INSERT INTO animais SET ?';
        let data = req.body;
        db.query(sql, data, (err, result) => {
            if (err) throw err;
            res.send('Animal inserido com sucesso!');
        });
    });

    // Recuperar todos os animais
    app.get(`${config.prefix}/pets`, (req, res) => {
        let sql = 'SELECT * FROM animais';

        db.query(sql, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

    // Recuperar um animal específico por ID
    app.get(`${config.prefix}/pet/:id`, (req, res) => {
        let sql = `SELECT *
                   FROM animais
                   WHERE id = ${req.params.id}`;

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
    app.delete(`${config.prefix}/pet/:id`, (req, res) => {
        let sql = `DELETE
                   FROM animais
                   WHERE id = ${req.params.id}`;

        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send('Animal excluído com sucesso!');
        });
    });
}