'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt'); // Criptografa a senha do usuário de exemplo

// Cria um usuário de demonstração para testes (email: admin@admin.com / senha: 123456)
module.exports = {
    async up(queryInterface) {
        const agora = new Date();
        const senhaHash = await bcrypt.hash('123456', 10);

        await queryInterface.bulkInsert('users', [
            {
                id: uuidv4(),
                nome: 'Administrador',
                email: 'admin@admin.com',
                senha: senhaHash,
                createdAt: agora,
                updatedAt: agora
            }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('users', { email: 'admin@admin.com' }, {});
    }
};
