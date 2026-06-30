require('dotenv').config(); // Carrega as variáveis protegidas do arquivo .env

// Configuração consumida pelo Sequelize CLI para rodar Migrations e Seeders.
// Mantém os mesmos dados de conexão usados pela aplicação (src/model/database.js).
module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || null,
        database: process.env.DB_NAME || 'mvc',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false
    }
};
