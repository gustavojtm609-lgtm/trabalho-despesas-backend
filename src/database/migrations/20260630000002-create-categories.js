'use strict';
// Migration criada para resolver o erro de arquivo não encontrado no Sequelize CLI (Categorias)
module.exports = {
    async up(queryInterface, Sequelize) {
        const tableExists = await queryInterface.showAllTables().then(tables => tables.includes('categories'));
        
        if (!tableExists) {
            await queryInterface.createTable('categories', {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true,
                    allowNull: false
                },
                nome: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
                descricao: {
                    type: Sequelize.STRING,
                    allowNull: true
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
        await queryInterface.dropTable('categories');
    }
};
