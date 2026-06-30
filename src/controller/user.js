const { UserDB } = require('../model/user');
const bcrypt = require('bcrypt'); // Biblioteca para criptografar senhas
const jwt = require('jsonwebtoken'); // Gerador de tokens de acesso

class UserController {
    // Valida dados, tritura a senha com bcrypt e salva o novo usuário
    async create(nome, email, senha) {
        if (!nome || !email || !senha) {
            const erro = new Error("Nome, email e senha are obrigatórios");
            erro.statusCode = 400;
            throw erro;
        }

        // Impede o cadastro de e-mails duplicados
        const userExists = await UserDB.findOne({ where: { email } });
        if (userExists) {
            const erro = new Error("E-mail já cadastrado");
            erro.statusCode = 400;
            throw erro;
        }

        // Embaralha a senha 10 vezes antes de salvar por segurança
        const hashedPassword = await bcrypt.hash(senha, 10);
        return await UserDB.create({ nome, email, senha: hashedPassword });
    }

    // Autentica o usuário e devolve sua pulseira de acesso (Token JWT)
    async login(email, senha) {
        const user = await UserDB.findOne({ where: { email } });
        if (!user) {
            const erro = new Error("Credenciais inválidas");
            erro.statusCode = 401; // Erro de Não Autorizado
            throw erro;
        }

        // Compara a senha digitada com a hash triturada do banco
        const checkPassword = await bcrypt.compare(senha, user.senha);
        if (!checkPassword) {
            const erro = new Error("Credenciais inválidas");
            erro.statusCode = 401;
            throw erro;
        }

        // Assina o token colocando o ID do usuário dentro dele (Válido por 1 dia)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: '1d' });
        return { user: { id: user.id, nome: user.nome, email: user.email }, token };
    }
}

module.exports = new UserController();