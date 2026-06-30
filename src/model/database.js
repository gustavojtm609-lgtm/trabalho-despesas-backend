const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega as variáveis protegidas do arquivo .env

// Cria e gerencia a conexão direta com o servidor MySQL
const sequelize = new Sequelize(
    process.env.DB_NAME || 'mvc', 
    process.env.DB_USER || 'root', 
    process.env.DB_PASS || '', 
    { 
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false // Desativa logs poluídos de SQL no terminal
    }
);

module.exports = { sequelize };