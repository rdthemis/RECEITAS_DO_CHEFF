const router = require("../routes/receita");
const prisma = require("./prisma");

const salvarReceita = (receita, userId) => {
    return prisma.receita.create({
        data: {
            descricao: receita.descricao,
            nome: receita.nome,
            tempoPreparo: receita.tempoPreparo,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
}

const buscaReceitas = (userId) => {
    return prisma.receita.findMany({
        where: {
            userId: userId,
        },
    });
}

const atualizarReceita = (receita, id, userId) => {
    return prisma.receita.updateMany({
        data: receita,
        where: {
            id: id,
            userId: userId
        },
    });
}

const removerReceita = (id, userId) => {
    return prisma.receita.deleteMany({
        where: {
            id: id,
            userId: userId
        }
    })
}

const buscaReceitaPorId = (id) => {
    return prisma.receita.findMany({
        where: {
            id: id,
        },
    });
}


module.exports = {
    salvarReceita,
    buscaReceitas,
    atualizarReceita,
    removerReceita,
    buscaReceitaPorId
}