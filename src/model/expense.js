const { sequelize } = require('./database');
const { DataTypes } = require('sequelize');

// Mapeia a tabela 'expenses' no banco de dados
const ExpenseDB = sequelize.define('expense', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: { args: [0.01], msg: "O valor deve ser maior que zero" } // Bloqueia valores negativos ou zero
        }
    },
    data: {
        type: DataTypes.DATEONLY, // Guarda apenas a data (AAAA-MM-DD), sem hora
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('PENDENTE', 'PAGA'), // Restringe as opções aceitas
        allowNull: false,
        defaultValue: 'PENDENTE'
    }
});

module.exports = { ExpenseDB };