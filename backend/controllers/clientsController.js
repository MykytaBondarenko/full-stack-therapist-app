const db = require("../database.js");

exports.getClientsData = (req, res) => {
    const data = req.query;
    const name = data.name ? data.name : undefined;

    let queryContent;
    console.log("name: " + name);
    if (name == undefined) queryContent = "SELECT * FROM Clients";
    else queryContent = "SELECT * FROM Clients WHERE name REGEXP \"" + name + "\""
    db.query(
        queryContent,
        function(error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                const rows = JSON.parse(JSON.stringify(result));
                //console.log(result);
                res.send(result);
            }
        }
    )
}

exports.createClientData = (req, res) => {
    const data = req.body;
    const name = data.name;
    const email = data.email;
    const phone_number = data.phone_number;
    const regularity = data.regularity;

    let queryContent = `INSERT INTO Clients (id, name, email, phone_number, regularity) VALUES (NULL, '${name}', '${email}', '${phone_number}', '${regularity}')`;

    console.log(queryContent);
    db.query(
        queryContent,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(result);
                res.send(result);
            }    
    });
}