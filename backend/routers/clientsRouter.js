const express = require('express');
const cors = require('cors');
const server = express.Router();
server.use(cors());
const clientsController = require("../controllers/clientsController.js");

server.get("/clients/", clientsController.getClientsData);

module.exports = server;