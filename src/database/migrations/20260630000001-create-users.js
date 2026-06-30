'use strict';
// Migration criada para resolver o erro de arquivo não encontrado no Sequelize CLI (Usuários)
module.exports = {
    async up(queryInterface, Sequelize) {
        const tableExists = await queryInterface.showAllTables().then(tables => tables.includes('users'));
        
        if (!tableExists) {
            await queryInterface.createTable('users', {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true,
                    allowNull: false
                },
                nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
                senha: {
                    type: Sequelize.STRING,
                    allowNull: false
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
        await queryInterface.dropTable('users');
    }
};
