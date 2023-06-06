const prisma = require("./prisma");

const saveReceita = (receita) => {
    return prisma.receita.create({
        data: receita,
    })
}

module.exports = {
    saveReceita,
}