require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const express = require('express');
const cors = require('cors');

// Conexão e models (o import de associations registra os relacionamentos)
const { sequelize } = require('./model/database');
require('./model/associations');

// Roteador central que reúne todas as rotas da API
const routes = require('./routes');

// Middleware de tratamento global de erros (sempre o último da cadeia)
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// =========================================================
// 🛡️ MIDDLEWARES GLOBAIS
// =========================================================
app.use(cors()); // Libera o acesso para o frontend (ex: http://localhost:5173)
app.use(express.json()); // Permite que o Express entenda requisições em JSON

// =========================================================
// 🚀 ROTAS DA APLICAÇÃO
// =========================================================
app.use(routes);

// =========================================================
// ⚠️ TRATAMENTO GLOBAL DE ERROS
// =========================================================
app.use(errorHandler);

// =========================================================
// 🔌 INICIALIZAÇÃO DO SERVIDOR
// =========================================================
const PORT = process.env.PORT || 3000;

// Sincroniza os models com o banco e só então sobe o servidor
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`=========================================`);
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
            console.log(`💾 [Banco de Dados] Conectado com sucesso!`);
            console.log(`=========================================`);
        });
    })
    .catch((erro) => {
        console.error('❌ Falha ao conectar no banco de dados:', erro.message);
    });

module.exports = app;
