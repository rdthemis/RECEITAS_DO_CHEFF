class errorEmail extends Error {
    constructor() {
        super("Email já cadastrado.");
    }
}

class usuarioNaoCadastrado extends Error {
    constructor() {
        super("Usuário não encontrado.")
    }
}

class receitaNaoencontrada extends Error {
    constructor() {
        super("Receita não encontrada.")
    }
}

module.exports = {
    errorEmail,
    usuarioNaoCadastrado,
    receitaNaoencontrada
}