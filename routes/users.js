const express = require("express");
const z = require("zod");
const { verificaEmail, saveUser } = require("../database/users");

const router = express.Router();

const UserSchema = z.object({
    nome: z.string().min(3),
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

module.exports = router;