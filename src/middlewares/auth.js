const jwt = require('jsonwebtoken');

// Interceptador de segurança que barra usuários sem token válido
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Barra se o cabeçalho de autenticação não foi enviado
    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    // Divide o texto para isolar a palavra "Bearer" do Token real
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ error: "Erro no token" });
    }

    const [scheme, token] = parts;
    // Valida se o formato começa com a palavra "Bearer"
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: "Token mal formatado" });
    }

    // Abre o token usando a chave secreta e valida a assinatura
    jwt.verify(token, process.env.JWT_SECRET || "fallback_secret", (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token inválido" });

        // Injeta os dados decodificados do usuário dentro da requisição
        req.user = decoded;
        return next(); // Libera o usuário para acessar a rota solicitada
    });
};

module.exports = authMiddleware;
