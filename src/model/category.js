const { sequelize } = require('./database');
const { DataTypes } = require('sequelize');

// Mapeia a tabela 'categories' no banco de dados
const CategoryDB = sequelize.define('category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = { CategoryDB };