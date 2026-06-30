// Importa o modelo de banco de dados da Categoria
const { CategoryDB } = require('../model/category');

class CategoryController {
    // Cria uma nova categoria após validar o nome
    async create(nome, descricao) {
        if (!nome) {
            const erro = new Error("O nome da categoria é obrigatório");
            erro.statusCode = 400; // Define o erro como erro de validação (Bad Request)
            throw erro;
        }
        return await CategoryDB.create({ nome, descricao });
    }

    // Busca todas as categorias salvas no banco
    async getAll() {
        return await CategoryDB.findAll();
    }

    // Puxa uma categoria pelo ID ou avisa se não existir
    async getById(id) {
        const category = await CategoryDB.findByPk(id);
        if (!category) {
            const erro = new Error("Categoria não encontrada");
            erro.statusCode = 404; // Erro de item não encontrado
            throw erro;
        }
        return category;
    }

    // Localiza a categoria e atualiza com os novos dados
    async update(id, dadosNovos) {
        const category = await this.getById(id);
        return await category.update(dadosNovos);
    }

    // Localiza a categoria e deleta ela do banco
    async remove(id) {
        const category = await this.getById(id);
        await category.destroy();
        return true;
    }
}

// Exporta a instância pronta para uso
module.exports = new CategoryController();