const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
require('dotenv').config();

const clientsRouter = require("./routers/clientsRouter.js");
const therapistsRouter = require("./routers/therapistsRouter.js");
const sessionsRouter = require("./routers/sessionsRouter.js");

const server = express();
server.use(cors());
server.use(bodyParse.json());
const PORT = process.env.PORT;

server.use(clientsRouter);
server.use(therapistsRouter);
server.use(sessionsRouter);

server.listen(PORT, () => {
    console.log('Server running http://localhost:' + PORT);
});