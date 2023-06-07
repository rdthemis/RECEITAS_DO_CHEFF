const prisma = require("./prisma");

const verificaEmail = (email) => {
    return prisma.user.findFirst({
        where: {
            email: email,
        },
    });
}

const saveUser = (user) => {
    return prisma.user.create({
        data: user
    })
}

module.exports = {
    verificaEmail,
    saveUser,
}
