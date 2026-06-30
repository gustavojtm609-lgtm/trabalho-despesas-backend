'use strict';

const { v4: uuidv4 } = require('uuid');

// Popula a tabela de categorias com valores iniciais de exemplo
module.exports = {
    async up(queryInterface) {
        const agora = new Date();
        await queryInterface.bulkInsert('categories', [
            { id: uuidv4(), nome: 'Alimentação', descricao: 'Gastos com comida e mercado', createdAt: agora, updatedAt: agora },
            { id: uuidv4(), nome: 'Transporte', descricao: 'Combustível, ônibus e aplicativos', createdAt: agora, updatedAt: agora },
            { id: uuidv4(), nome: 'Lazer', descricao: 'Entretenimento e passeios', createdAt: agora, updatedAt: agora },
            { id: uuidv4(), nome: 'Moradia', descricao: 'Aluguel, contas e manutenção', createdAt: agora, updatedAt: agora }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('categories', null, {});
    }
};
