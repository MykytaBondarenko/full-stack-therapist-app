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