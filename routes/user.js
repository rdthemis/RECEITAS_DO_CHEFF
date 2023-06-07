const express = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verificaEmail, saveUser } = require("../database/user");

const router = express.Router();

const UserSchema = z.object({
    nome: z.string().min(3),
    email: z.string().email(),
    senha: z.string().min(6)
})

const LoginSchema = z.object({
    email: z.string().email(),
    senha: z.string().min(6)
})

router.post("/registro", async (req, res) => {

    try {
        const user = UserSchema.parse(req.body);

        const email = await verificaEmail(user.email);

        if (email) return res.status(401).json({
            message: "Email já cadastrado.",
        });

        const senhaHash = bcrypt.hashSync(user.senha, 10);

        user.senha = senhaHash;

        const savedUser = await saveUser(user);
        delete savedUser.senha;
        res.json({
            savedUser,
        });
    } catch (error) {
        if (error instanceof z.ZodError)
            return res.status(401).json({
                message: error.errors,
            });
        res.status(500).json({
            message: "Erro no servidor",
        });
    };
})

router.post("/login", async (req, res) => {
    const data = LoginSchema.parse(req.body);

    const user = await verificaEmail(data.email);
    if (!user) return res.status(401).send();

    const senha = bcrypt.compareSync(data.senha, user.senha);
    if (!senha) return res.status(401).send();

    const token = jwt.sign({
        userId: user.id,
        nome: user.nome,
    }, process.env.SECRET);

    res.status(201).json({
        success: true,
        token: token,
    });
})

module.exports = router;