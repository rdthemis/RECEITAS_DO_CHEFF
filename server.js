const express = require("express");
const usersRouter = require("./routes/users");

const server = express();

server.use(express.json());
server.use(usersRouter);

module.exports = server;
