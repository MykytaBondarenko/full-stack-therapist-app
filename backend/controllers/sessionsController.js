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

exports.createSessionData = (req, res) => {
    const data = req.body;
    const therapist_id = data.therapist_id;
    const client_id = data.client_id;
    const notes = data.notes;
    const date = data.date;
    const length = data.length;

    let queryContent = `INSERT INTO Sessions (id, therapist_id, client_id, notes, date, length) VALUES (NULL, '${therapist_id}', '${client_id}', '${notes}', '${date}', '${length}')`;

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

exports.updateSessionData = (req, res) => {
    const data = req.body;
    const id = data.id;
    const therapist_id = data.therapist_id;
    const client_id = data.client_id;
    const notes = data.notes;
    const date = data.date;
    const length = data.length;

    let queryContent = `UPDATE Sessions SET therapist_id = '${therapist_id}', client_id = '${client_id}', notes = '${notes}', date = '${date}', length = '${length}' WHERE Sessions.id = ${id}`;
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

exports.deleteSessionData = (req, res) => {
    const data = req.params;
    const sessionID = data.sessionID;

    let queryContent = `DELETE FROM Sessions WHERE id = ${sessionID}`;
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