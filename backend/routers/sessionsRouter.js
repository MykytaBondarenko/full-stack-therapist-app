const express = require('express');
const cors = require('cors');
const server = express.Router();
server.use(cors());
const sessionsController = require("../controllers/sessionsController.js");

server.get("/sessions/", sessionsController.getSessionsData);

module.exports = server;