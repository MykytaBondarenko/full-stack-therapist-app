const express = require('express');
const cors = require('cors');
const server = express.Router();
server.use(cors());
const sessionsController = require("../controllers/sessionsController.js");

server.get("/sessions/", sessionsController.getSessionsData);
server.post("/sessions/", sessionsController.createSessionData);
server.put("/sessions/", sessionsController.updateSessionData);
server.delete("/sessions/:sessionID", sessionsController.deleteSessionData);

module.exports = server;