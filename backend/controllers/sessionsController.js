const db = require("../database.js");

exports.getSessionsData = (req, res) => {
    const data = req.query;
    const therapist_id = data.therapist_id ? data.therapist_id : undefined;
    const client_id = data.client_id ? data.client_id : undefined;

    console.log("therapist_id: " + therapist_id);
    console.log("client_id: " + client_id);
    let queryContent = "SELECT * FROM Sessions";
    if (therapist_id != undefined && client_id != undefined) {
        queryContent += (" WHERE therapist_id = " + therapist_id + " AND client_id = "+ client_id);
    } else {
        if (therapist_id != undefined || client_id != undefined) {
            if (therapist_id != undefined) queryContent += (" WHERE therapist_id = " + therapist_id);
            else queryContent += (" WHERE client_id = " + client_id);
        }
    }
    console.log(queryContent);

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