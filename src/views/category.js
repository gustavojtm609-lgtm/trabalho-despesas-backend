const CategoryController = require("../controller/category.js");

class CategoryView {
    // Processa a criação de categoria e adiciona os links do padrão HATEOAS
    async create(req, res) {
        try {
            const { nome, descricao } = req.body;
            const novaCategoria = (await CategoryController.create(nome, descricao)).toJSON();

            // Injeta os caminhos de auto-representação da API no JSON de saída
            novaCategoria._links = [
                { rel: "self", method: "GET", href: `http://localhost:3000/categories/${novaCategoria.id}` },
                { rel: "update", method: "PUT", href: `http://localhost:3000/categories/${novaCategoria.id}` },
                { rel: "delete", method: "DELETE", href: `http://localhost:3000/categories/${novaCategoria.id}` },
                { rel: "all_categories", method: "GET", href: "http://localhost:3000/categories" }
            ];

            return res.status(201).json({ message: "Categoria adicionada com sucesso!", category: novaCategoria });
        } catch (erro) {
            const status = erro.statusCode || 500;
            return res.status(status).json({ error: erro.message });
        }
    }

    // Lista todas as categorias injetando links individuais em cada uma delas
    async getAll(req, res) {
        try {
            const categorias = await CategoryController.getAll();
            const categoriasComLinks = categorias.map(categoria => {
                const categoriaFormatada = categoria.toJSON();
                categoriaFormatada._links = [
                    { rel: "self", method: "GET", href: `http://localhost:3000/categories/${categoria.id}` },
                    { rel: "update", method: "PUT", href: `http://localhost:3000/categories/${categoria.id}` },
                    { rel: "delete", method: "DELETE", href: `http://localhost:3000/categories/${categoria.id}` }
                ];
                return categoriaFormatada;
            });
            res.status(200).json(categoriasComLinks);
        } catch (erro) {
            const status = erro.statusCode || 500;
            return res.status(status).json({ error: erro.message });
        }
    }

    // Exibe apenas uma categoria pelo ID com seus respectivos links lógicos
    async getById(req, res) {
        const { id } = req.params;
        try {
            const categoriaEncontrada = (await CategoryController.getById(id)).toJSON();
            categoriaEncontrada._links = [
                { rel: "self", method: "GET", href: `http://localhost:3000/categories/${id}` },
                { rel: "update", method: "PUT", href: `http://localhost:3000/categories/${id}` },
                { rel: "delete", method: "DELETE", href: `http://localhost:3000/categories/${id}` },
                { rel: "all_categories", method: "GET", href: "http://localhost:3000/categories" }
            ];
            res.status(200).json(categoriaEncontrada);
        } catch (erro) {
            const status = erro.statusCode || 500;
            return res.status(status).json({ error: erro.message });
        }
    }

    // Responde com os dados já alterados e links atualizados da categoria
    async update(req, res) {
        const { id } = req.params;
        const dadosNovos = req.body;
        try {
            const categoriaAtualizada = (await CategoryController.update(id, dadosNovos)).toJSON();
            categoriaAtualizada._links = [
                { rel: "self", method: "GET", href: `http://localhost:3000/categories/${id}` },
                { rel: "delete", method: "DELETE", href: `http://localhost:3000/categories/${id}` },
                { rel: "all_categories", method: "GET", href: "http://localhost:3000/categories" }
            ];
            res.status(200).json(categoriaAtualizada);
        } catch (erro) {
            const status = erro.statusCode || 500;
            return res.status(status).json({ error: erro.message });
        }
    }

    // Confirma a exclusão bem-sucedida da categoria para o cliente HTTP
    async remove(req, res) {
        const { id } = req.params;
        try {
            await CategoryController.remove(id);
            const respostaDelete = {
                message: "Categoria excluída com sucesso!",
                _links: [{ rel: "all_categories", method: "GET", href: "http://localhost:3000/categories" }]
            };
            res.status(200).json(respostaDelete);
        } catch (erro) {
            const status = erro.statusCode || 500;
            return res.status(status).json({ error: erro.message });
        }
    }
}

module.exports = new CategoryView();
