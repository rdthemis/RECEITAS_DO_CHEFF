const express = require("express");
const z = require("zod");
const auth = require("../middleware/auth");
const { salvarReceita, buscaReceitas, atualizarReceita, removerReceita, buscaReceitaPorId } = require("../database/receita");
const { errorEmail, receitaNaoencontrada } = require("../errors/errors");

const router = express.Router();

const ReceitaSchema = z.object({
    nome: z.string().min(3),
    descricao: z.string().min(6),
    tempoPreparo: z.string()
})

router.post("/receita", auth, async (req, res, next) => {
    try {

        const receita = ReceitaSchema.parse(req.body);
        const userId = req.user.userId;

        const receitaSalva = await salvarReceita(receita, userId);
        if (!receitaSalva) throw new errorEmail;

        res.status(201).json({
            receitaSalva,
        });
    } catch (error) {
        next(error);
    };
})

router.get("/receitas", auth, async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const receitas = await buscaReceitas(userId);

        res.status(200).json({
            receitas,
        });
    } catch (error) {
        next(error);
    };
})

router.put("/receita/:id", auth, async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        //const receitaBD = await buscaReceitaPorId(id);

        const userId = req.user.userId;

        const receita = ReceitaSchema.parse(req.body);

        const receitaAtualizada = await atualizarReceita(receita, id, userId);

        if (receitaAtualizada.count < 1) throw new receitaNaoencontrada();

        res.status(200).json({
            receitaAtualizada,
        });
    } catch (error) {
        next(error);
    }
})

router.delete("/receita/:id", auth, async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const userId = req.user.userId;

        const receitaRemovida = await removerReceita(id, userId);

        res.status(200).json({
            receitaRemovida
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;