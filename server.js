const express = require("express");
const userRouter = require("./routes/user");
const receitasRouter = require("./routes/receita");

const server = express();

server.use(express.json());
server.use(userRouter);
server.use(receitasRouter);

module.exports = server;
