const express = require("express");
const userRouter = require("./routes/user");
const receitasRouter = require("./routes/receita");
const { errorEmail, usuarioNaoCadastrado, receitaNaoencontrada } = require("./errors/errors");
const { ZodError } = require("zod");

const server = express();

server.use(express.json());
server.use(userRouter);
server.use(receitasRouter);
server.use((err, req, res, next) => {
    if (err instanceof errorEmail)
        return res.status(400).json({
            message: err.message,
        });
    if (err instanceof usuarioNaoCadastrado)
        return res.status(401).json({
            message: err.message,
        });

    if (err instanceof receitaNaoencontrada)
        return res.status(401).json({
            message: err.message,
        });

    if (err instanceof ZodError)
        return res.status(422).json({
            message: err.errors,
        });
    res.status(500).json({
        message: "Erro Servidor",
    });
});

module.exports = server;
