// Middleware de tratamento global de erros (último da cadeia do Express)
// Captura qualquer erro lançado nas rotas e padroniza a resposta JSON
const errorHandler = (err, req, res, next) => {
    // Usa o código de status anexado ao erro ou assume 500 (erro interno)
    const status = err.statusCode || 500;

    // Mostra o erro no terminal para facilitar a depuração do desenvolvedor
    console.error(`[ERRO ${status}]`, err.message);

    return res.status(status).json({
        status: "erro",
        mensagem: err.message || "Erro interno no servidor"
    });
};

module.exports = errorHandler;
