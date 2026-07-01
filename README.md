Sistema de Gestão de Despesas Pessoais — Documentação da API

Este projeto é uma API RESTful desenvolvida para o controle de despesas financeiras, permitindo a gestão de usuários, categorias e gastos, com foco em segurança, organização e boas práticas de desenvolvimento.




 Tecnologias Utilizadas

•
Node.js: Ambiente de execução JavaScript no servidor.

•
Express: Framework para construção de APIs rápidas e flexíveis.

•
Sequelize: ORM (Object-Relational Mapping) para gerenciamento do banco de dados MySQL.

•
JWT (JSON Web Token): Sistema de autenticação segura para rotas protegidas.

•
Bcrypt: Criptografia de senhas para garantir a segurança dos usuários.

•
Dotenv: Gerenciamento de variáveis de ambiente (.env).




 Arquitetura do Projeto (MVC)

O projeto segue o padrão MVC (Model-View-Controller), garantindo a separação de responsabilidades:

•
/src/model: Define a estrutura das tabelas e as associações (Relacionamentos 1:N).

•
/src/controller: Contém as regras de negócio e lógica de processamento.

•
/src/views: Formata a resposta JSON, incluindo links HATEOAS para navegação na API.

•
/src/routes: Define os endpoints da aplicação.

•
/src/middlewares: Filtros de segurança (Auth) e tratamento global de erros.

•
/src/database: Contém as migrações (criação de tabelas) e sementes (dados iniciais).




 Instalação e Configuração

1.
Instalar dependências:

Bash


npm install





2.
Configurar Banco de Dados:
Crie um banco de dados chamado mvc no seu MySQL e configure o arquivo .env na raiz do projeto:

Plain Text


DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=mvc
DB_HOST=localhost
JWT_SECRET=sua_chave_secreta





3.
Rodar Migrações e Seeders:

Bash


npm run db:reset





4.
Iniciar o Servidor:

Bash


npm start








 Como Testar (Guia Postman)

1. Autenticação

•
Cadastro: POST /users (Envie nome, email e senha).

•
Login: POST /auth/login (Receba o Token).

•
Configuração: Copie o token e configure na aba Authorization da sua Collection como Bearer Token.

2. CRUD de Categorias e Despesas

•
GET /categories: Lista categorias.

•
POST /expenses: Cria um gasto (necessário passar o categoriaId).

•
PUT /expenses/:id: Atualiza uma despesa existente.

•
DELETE /expenses/:id: Remove uma despesa.

3. Filtros Avançados

A rota GET /expenses aceita os seguintes parâmetros na URL:

•
status: PAGA ou PENDENTE.

•
valorMin / valorMax: Faixa de preço.

•
dataInicio / dataFim: Período de tempo.

•
categoria: Filtro por ID de categoria.

4. Dashboard

•
GET /dashboard/total-expenses: Soma total de gastos.

•
GET /dashboard/expenses-by-category: Relatório de gastos agrupados.


