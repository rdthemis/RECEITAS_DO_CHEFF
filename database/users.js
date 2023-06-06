const prisma = require("./prisma");

const verificaEmail = (email) => {
    return prisma.users.findFirst({
        where: {
            email: email,
        },
    });
}

const saveUser = (user) => {
    return prisma.users.create({
        data: user
    })
}

module.exports = {
    verificaEmail,
    saveUser,
}
