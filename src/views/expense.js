const ExpenseController = require('../controller/expense.js');

class ExpenseView {

    // Extrai os dados do body, pega o ID do usuário autenticado no token e cria a despesa
    async create(req, res) {
        try {
            const { descricao, valor, data, status, categoriaId } = req.body;
            const usuarioId = req.user.id;
            const novaDespesa = await ExpenseController.create(descricao, valor, data, status, categoriaId, usuarioId);
            return this.renderSuccess(res, novaDespesa, 201);
        } catch (error) {
            return this.renderError(res, error.message, error.statusCode || 400);
        }
    }

    // Retorna a listagem de despesas repassando filtros informados na URL (req.query)
    async getAll(req, res) {
        try {
            const usuarioId = req.user.id;
            const despesas = await ExpenseController.getAll(usuarioId, req.query);
            return this.renderSuccess(res, despesas);
        } catch (error) {
            return this.renderError(res, error.message);
        }
    }

    // Captura o ID do parâmetro da rota e renderiza a despesa correspondente
    async getById(req, res) {
        try {
            const { id } = req.params;
            const usuarioId = req.user.id;
            const despesa = await ExpenseController.getById(id, usuarioId);
            return this.renderSuccess(res, despesa);
        } catch (error) {
            return this.renderError(res, error.message, error.statusCode || 404);
        }
    }

    // Processa a modificação da despesa informada
    async update(req, res) {
        try {
            const { id } = req.params;
            const usuarioId = req.user.id;
            const despesaAtualizada = await ExpenseController.update(id, req.body, usuarioId);
            return this.renderSuccess(res, despesaAtualizada);
        } catch (error) {
            return this.renderError(res, error.message, error.statusCode || 400);
        }
    }

    // Executa e responde com mensagem de sucesso após deletar o registro
    async remove(req, res) {
        try {
            const { id } = req.params;
            const usuarioId = req.user.id;
            await ExpenseController.remove(id, usuarioId);
            return this.renderSuccess(res, "Despesa removida com sucesso", 200);
        } catch (error) {
            return this.renderError(res, error.message, error.statusCode || 400);
        }
    }

    // --- ENVELOPE DAS RESPOSTAS DO DASHBOARD (Formatos do Enunciado) ---

    // Devolve o JSON com a chave "total" exigida no requisito estatístico
    async getTotal(req, res) {
        try {
            const usuarioId = req.user.id;
            const total = await ExpenseController.getTotal(usuarioId);
            return res.status(200).json({ total });
        } catch (error) {
            return this.renderError(res, error.message);
        }
    }

    // Devolve o JSON com a chave "quantidade" exata pedida na instrução
    async getCount(req, res) {
        try {
            const usuarioId = req.user.id;
            const quantidade = await ExpenseController.getCount(usuarioId);
            return res.status(200).json({ quantidade });
        } catch (error) {
            return this.renderError(res, error.message);
        }
    }

    // Responde com a lista de objetos contendo gastos agrupados por categoria
    async getByCategory(req, res) {
        try {
            const usuarioId = req.user.id;
            const resumo = await ExpenseController.getByCategory(usuarioId);
            return res.status(200).json(resumo);
        } catch (error) {
            return this.renderError(res, error.message);
        }
    }

    // --- MÉTODOS AUXILIARES DE RENDERIZAÇÃO HATEOAS ---

    // Envelopa o resultado em um padrão de sucesso e formata listas ou objetos únicos
    renderSuccess(res, data, statusCode = 200) {
        let finalData = data;
        if (Array.isArray(data)) {
            finalData = data.map(expense => this.addHateoasLinks(expense));
        } else if (typeof data === 'object' && data !== null && data.id) {
            finalData = this.addHateoasLinks(data);
        }
        return res.status(statusCode).json({ status: "sucesso", dados: finalData });
    }

    // Adiciona links dinâmicos hypermídias para controle do RESTful (HATEOAS)
    addHateoasLinks(expense) {
        const expData = expense.toJSON ? expense.toJSON() : expense;
        return {
            ...expData,
            _links: [
                { rel: "self", method: "GET", href: `http://localhost:3000/expenses/${expData.id}` },
                { rel: "update", method: "PUT", href: `http://localhost:3000/expenses/${expData.id}` },
                { rel: "delete", method: "DELETE", href: `http://localhost:3000/expenses/${expData.id}` }
            ]
        };
    }

    // Padroniza as saídas quando ocorre algum erro no sistema
    renderError(res, mensagem, statusCode = 500) {
        return res.status(statusCode).json({ status: "erro", mensagem: mensagem });
    }
}

module.exports = new ExpenseView();
