const express = require("express");
const z = require("zod");
const auth = require("../middleware/auth");
const { salvarReceita, buscaReceitas, atualizarReceita, removerReceita } = require("../database/receita");

const router = express.Router();

const ReceitaSchema = z.object({
    nome: z.string().min(3),
    descricao: z.string().min(6),
    tempoPreparo: z.string()
})

router.post("/receita", auth, async (req, res) => {
    try {

        const receita = ReceitaSchema.parse(req.body);
        const userId = req.user.userId;

        const receitaSalva = await salvarReceita(receita, userId);

        res.status(201).json({
            receitaSalva,
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

router.get("/receitas", auth, async (req, res) => {
    try {
        const userId = req.user.userId;
        const receitas = await buscaReceitas(userId);

        res.status(201).json({
            receitas,
        });
    } catch (error) {
        res.status(401).json({
            message: error.errors,
        });
    };
})

router.put("/receita/:id", auth, async (req, res) => {
    try {
        const id = Number(req.params.id);

        const userId = req.user.userId;

        const receita = ReceitaSchema.parse(req.body);

        const receitaAtualizada = await atualizarReceita(receita, id, userId);

        res.status(201).json({
            updatedReceita,
        });
    } catch (error) {
        if (error instanceof z.ZodError)
            return res.status(422).json({
                message: error.errors,
            });
        res.status(500).json({
            message: "Erro no servidor",
        });
    }
})

router.delete("/receita/:id", auth, async (req, res) => {
    try {
        const id = Number(req.params.id);

        const userId = req.user.userId;

        await removerReceita(id, userId);

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: "Erro no Servidor",
        });
    }
});

module.exports = router;