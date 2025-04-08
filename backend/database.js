require('dotenv').config();
const mysql = require('mysql');

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const connection = mysql.createConnection({
    host:     DB_HOST,
    user:     DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL connected!");
    }
});

module.exports = connection;

/*connection.query(
    "INSERT INTO `Therapists` (`id`, `title`, `name`, `email`, `location`, `years`, `availability`) VALUES (NULL, 'idk1', 'idk1', 'idk1', 'idk1', '1', 'TAKING CLIENTS'), (NULL, 'idk2', 'idk2', 'idk2', 'idk2', '2', 'NOT TAKING CLIENTS')",
    function (error, result, fields) {
        if (error) {
            console.log(error);
        } else {
            const rows = JSON.parse(JSON.stringify(result));
            console.log(rows);
        }
    }
);*/