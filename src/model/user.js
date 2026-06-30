const { sequelize } = require('./database');
const { DataTypes } = require('sequelize');

// Mapeia a tabela 'users' no banco de dados
const UserDB = sequelize.define('user', {
    id: {
        type: DataTypes.UUID, // Gera IDs únicos e seguros em formato texto longo
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "O nome não pode ser vazio" }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Impede e-mails duplicados direto na estrutura do banco
        validate: {
            isEmail: { msg: "Formato de e-mail inválido" } // Garante um e-mail válido
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "A senha não pode ser vazia" }
        }
    }
});

module.exports = { UserDB };