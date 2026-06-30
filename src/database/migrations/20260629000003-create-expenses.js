'use strict';

// Cria a tabela 'expenses' com as chaves estrangeiras de usuário e categoria
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('expenses', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: false
            },
            valor: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            data: {
                type: Sequelize.DATEONLY, // Guarda apenas a data (AAAA-MM-DD), sem hora
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('PENDENTE', 'PAGA'), // Restringe as opções aceitas
                allowNull: false,
                defaultValue: 'PENDENTE'
            },
            categoriaId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: 'categories', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },
            usuarioId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('expenses');
    }
};
