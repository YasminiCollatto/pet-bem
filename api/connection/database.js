const mysql = require('mysql2')

/** @namespace application.app.connection.Database**/
module.exports.open = function (ctrl){

    try {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'petbem24',
            database: 'PetBem',
            charset: 'utf8'
        });
        db.connect((err) => {
            if (err) throw err;
            console.log(`${ctrl} connected`);
        });
        return db;
    } catch (e) {
        console.error(e);
    }




}