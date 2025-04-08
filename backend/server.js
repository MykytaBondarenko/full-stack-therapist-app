const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
require('dotenv').config();

const clientsRouter = require("./routers/clientsRouter.js");

const server = express();
server.use(cors());
server.use(bodyParse.json());
const PORT = process.env.PORT;

server.use(clientsRouter);

server.listen(PORT, () => {
    console.log('Server running http://localhost:' + PORT);
});