const express = require('express');
const cors = require('cors');
const server = express.Router();
server.use(cors());
const therapistsController = require("../controllers/therapistsController.js");

server.get("/therapists/", therapistsController.getTherapistsData);
server.post("/therapists/", therapistsController.createTherapistData);
server.put("/therapists/", therapistsController.updateTherapistData);
server.delete("/therapists/:therapistID", therapistsController.deleteTherapistData);

module.exports = server;