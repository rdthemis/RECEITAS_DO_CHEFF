const jwt = require('jsonwebtoken');
const { usuarioNaoCadastrado } = require('../errors/errors');

const auth = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) throw new usuarioNaoCadastrado();

        const token = authorization.split(" ")[1];

        const payload = jwt.verify(token, process.env.SECRET);

        req.user = payload;

        next();

    } catch (error) {
        next(error);
    }

};

module.exports = auth;