const express = require('express');
const cors = require('cors');
const server = express.Router();
server.use(cors());
const therapistsController = require("../controllers/therapistsController.js");

server.get("/therapists/", therapistsController.getTherapistsData);

module.exports = server;