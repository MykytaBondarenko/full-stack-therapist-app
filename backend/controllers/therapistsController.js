const db = require("../database.js");

exports.getTherapistsData = (req, res) => {
    const data = req.query;
    const name = data.name ? data.name : undefined;

    let queryContent;
    console.log("name: " + name);
    if (name == undefined) queryContent = "SELECT * FROM Therapists";
    else queryContent = "SELECT * FROM Therapists WHERE name REGEXP \"" + name + "\""
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

exports.createTherapistData = (req, res) => {
    const data = req.body;
    const title = data.title;
    const name = data.name;
    const email = data.email;
    const location = data.location;
    const years = data.years;
    const availability = data.availability;

    let queryContent = `INSERT INTO Therapists (id, title, name, email, location, years, availability) VALUES (NULL, '${title}', '${name}', '${email}', '${location}', '${years}', '${availability}')`;

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

exports.updateTherapistData = (req, res) => {
    const data = req.body;
    const id = data.id;
    const title = data.title;
    const name = data.name;
    const email = data.email;
    const location = data.location;
    const years = data.years;
    const availability = data.availability;

    let queryContent = `UPDATE Therapists SET title = '${title}', name = '${name}', email = '${email}', location = '${location}', years = '${years}', availability = '${availability}' WHERE Therapists.id = ${id}`;
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

exports.deleteTherapistData = (req, res) => {
    const data = req.params;
    const therapistID = data.therapistID;

    let queryContent1 = `DELETE FROM Sessions WHERE therapist_id = ${therapistID}`;
    let queryContent2 = `DELETE FROM Therapists WHERE id = ${therapistID}`;
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