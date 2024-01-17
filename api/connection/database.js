const mysql = require('mysql2')

/** @namespace application.app.connection.Database**/
module.exports.open = function (){

    try {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'petbem24',
            database: 'PetBem'
        });
        db.connect((err) => {
            if (err) throw err;
            console.log('conexao aberta!');
        });
        return db;
    } catch (e) {
        console.error(e);
    }




}