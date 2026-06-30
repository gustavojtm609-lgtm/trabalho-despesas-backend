// Importa os modelos e os operadores lógicos do Sequelize
const { ExpenseDB } = require('../model/expense');
const { CategoryDB } = require('../model/category');
const { Op } = require('sequelize');

class ExpenseController {
    // Valida os campos obrigatórios e cria a despesa vinculada ao usuário
    async create(descricao, valor, data, status, categoriaId, usuarioId) {
        if (!descricao || !valor || !categoriaId) {
            const erro = new Error("Descrição, valor e categoria são obrigatórios");
            erro.statusCode = 400;
            throw erro;
        }
        return await ExpenseDB.create({ descricao, valor, data, status, categoriaId, usuarioId });
    }

    // Lista despesas do usuário aplicando filtros dinâmicos de busca
    async getAll(usuarioId, query = {}) {
        const whereClause = { usuarioId }; // Garante que o usuário só veja o que é dele

        // Se vier filtro por status ou categoria na URL, adiciona na busca
        if (query.status) whereClause.status = query.status;
        if (query.categoria) whereClause.categoriaId = query.categoria;
        
        // Filtro de valores (Maior ou igual / Menor ou igual)
        if (query.valorMin || query.valorMax) {
            whereClause.valor = {};
            if (query.valorMin) whereClause.valor[Op.gte] = parseFloat(query.valorMin);
            if (query.valorMax) whereClause.valor[Op.lte] = parseFloat(query.valorMax);
        }

        // Filtro por período de datas (Início e Fim)
        if (query.dataInicio || query.dataFim) {
            whereClause.data = {};
            if (query.dataInicio) whereClause.data[Op.gte] = query.dataInicio;
            if (query.dataFim) whereClause.data[Op.lte] = query.dataFim;
        }

        // Faz a busca trazendo junto o nome da Categoria vinculada
        return await ExpenseDB.findAll({ 
            where: whereClause,
            include: [{ model: CategoryDB, as: 'category', attributes: ['nome'] }]
        });
    }

    // Busca uma despesa específica e confere se ela pertence ao usuário
    async getById(id, usuarioId) {
        const expense = await ExpenseDB.findOne({ where: { id, usuarioId } });
        if (!expense) {
            const erro = new Error("Despesa não encontrada");
            erro.statusCode = 404;
            throw erro;
        }
        return expense;
    }

    // Modifica os dados de uma despesa específica do usuário
    async update(id, dadosNovos, usuarioId) {
        const expense = await this.getById(id, usuarioId);
        return await expense.update(dadosNovos);
    }

    // Remove uma despesa do banco de dados
    async remove(id, usuarioId) {
        const expense = await this.getById(id, usuarioId);
        await expense.destroy();
        return true;
    }

    // --- MÉTODOS DO DASHBOARD ---

    // Soma o valor total de todas as despesas salvas do usuário
    async getTotal(usuarioId) {
        const total = await ExpenseDB.sum('valor', { where: { usuarioId } });
        return total || 0;
    }

    // Conta a quantidade total de notas fiscais/despesas do usuário
    async getCount(usuarioId) {
        return await ExpenseDB.count({ where: { usuarioId } });
    }

    // Agrupa e calcula o total acumulado em cada categoria
    async getByCategory(usuarioId) {
        const despesas = await ExpenseDB.findAll({
            where: { usuarioId },
            include: [{ model: CategoryDB, as: 'category', attributes: ['nome'] }]
        });
        
        const totalPorCategoria = {};
        // Soma os valores agrupando por nome de categoria no objeto
        despesas.forEach(d => {
            const catNome = d.category ? d.category.nome : 'Sem Categoria';
            if (!totalPorCategoria[catNome]) totalPorCategoria[catNome] = 0;
            totalPorCategoria[catNome] += d.valor;
        });

        // Formata o resultado no padrão exato exigido pelo enunciado
        return Object.keys(totalPorCategoria).map(key => ({
            categoria: key,
            total: totalPorCategoria[key]
        }));
    }
}

module.exports = new ExpenseController();