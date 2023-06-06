const express = require("express");
const z = require("zod");
const auth = require("../middleware/auth");
const { saveReceita } = require("../database/receita");

const router = express.Router();

const ReceitaSchema = z.object({
    nome: z.string().min(3),
    descricao: z.string().min(6),
    tempoPreparo: z.zod
})

router.post("/receita", auth, async (req, res) => {
    try {

        const receita = ReceitaSchema.parse(req.body);
        const savedReceita = await saveReceita(receita);

        res.status(201).json({
            savedReceita,
        });
    } catch (error) {
        if (error instanceof z.ZodError)
            return res.status(422).json({
                message: error.errors,
            });
        res.status(500).json({
            message: "Erro no servidor",
        });
    };
})

module.exports = router;