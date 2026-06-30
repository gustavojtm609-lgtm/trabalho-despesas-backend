'use strict';
// Migration criada para resolver o erro de arquivo não encontrado no Sequelize CLI
module.exports = {
    async up(queryInterface, Sequelize) {
        // Verifica se a tabela já existe antes de tentar criar
        const tableExists = await queryInterface.showAllTables().then(tables => tables.includes('expenses'));
        
        if (!tableExists) {
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
                    type: Sequelize.DATEONLY,
                    allowNull: false
                },
                status: {
                    type: Sequelize.ENUM('PENDENTE', 'PAGA'),
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
        }
    },

    async down(queryInterface) {
        await queryInterface.dropTable('expenses');
    }
};
