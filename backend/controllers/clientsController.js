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

exports.updateClientData = (req, res) => {
    const data = req.body;
    const id = data.id;
    const name = data.name;
    const email = data.email;
    const phone_number = data.phone_number;
    const regularity = data.regularity;

    let queryContent = `UPDATE Clients SET name = '${name}', email = '${email}', phone_number = '${phone_number}', regularity = '${regularity}' WHERE Clients.id = ${id}`;
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

exports.deleteClientData = (req, res) => {
    const data = req.params;
    const clientID = data.clientID;

    let queryContent1 = `DELETE FROM Sessions WHERE client_id = ${clientID}`;
    let queryContent2 = `DELETE FROM Clients WHERE id = ${clientID}`;
    console.log(queryContent1);
    console.log(queryContent2);
    db.query(
        queryContent1,
        function (error, result) {
            if (error) {
                console.log(error);
                res.send(error);
                return;
            } else {
                console.log(result);
            }    
    });
    db.query(
        queryContent2,
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