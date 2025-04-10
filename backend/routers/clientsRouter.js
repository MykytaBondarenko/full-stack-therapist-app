const express = require('express');
const cors = require('cors');
const server = express.Router();
server.use(cors());
const clientsController = require("../controllers/clientsController.js");

server.get("/clients/", clientsController.getClientsData);
server.post("/clients/", clientsController.createClientData);
server.put("/clients/", clientsController.updateClientData);
server.delete("/clients/:clientID", clientsController.deleteClientData);

module.exports = server;