# Sistema de Controle de Despesas — API RESTful

API REST desenvolvida em **Node.js + Express + Sequelize + MySQL**, seguindo o padrão **MVC**, para gerenciar despesas pessoais com autenticação JWT, categorias e estatísticas (dashboard).

---

## Tecnologias

- **Node.js** + **Express** — servidor e rotas
- **Sequelize** + **MySQL** (mysql2) — ORM e banco de dados
- **JWT** (jsonwebtoken) — autenticação
- **bcrypt** — criptografia de senhas
- **dotenv** — variáveis de ambiente

---

## Arquitetura (MVC)

```
src/
 ├── controller/     # Regras de negócio (User, Category, Expense)
 ├── views/          # Camada que trata req/res e formata a resposta (HATEOAS)
 ├── model/          # Models do Sequelize + conexão + associações
 ├── routes/         # Definição das rotas RESTful
 ├── middlewares/    # Autenticação (JWT) e tratamento global de erros
 ├── config/         # Configuração do Sequelize CLI
 ├── database/       # Migrations e Seeders
 └── app.js          # Inicialização do servidor
```

---

## Como Rodar

1. Instale o [Node.js](https://nodejs.org/) e tenha um **MySQL** rodando.
2. Crie o banco de dados (padrão `mvc`) e ajuste o arquivo `.env`:

   ```env
   PORT=3000
   JWT_SECRET=sua_chave_secreta
   DB_NAME=mvc
   DB_USER=root
   DB_PASS=
   DB_HOST=localhost
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Rode as migrations e os seeders (cria as tabelas e dados de exemplo):

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. Inicie o servidor:

   ```bash
   npm start
   ```

   O servidor sobe em `http://localhost:3000`.

> Usuário de demonstração criado pelo seeder: **admin@admin.com** / senha **123456**.

---

## Rotas

### Autenticação
| Método | Rota          | Descrição                  |
|--------|---------------|----------------------------|
| POST   | `/users`      | Cadastro de usuário        |
| POST   | `/auth/login` | Login (retorna o token JWT)|

### Categorias *(requer token)*
| Método | Rota               |
|--------|--------------------|
| GET    | `/categories`      |
| GET    | `/categories/:id`  |
| POST   | `/categories`      |
| PUT    | `/categories/:id`  |
| DELETE | `/categories/:id`  |

### Despesas *(requer token)*
| Método | Rota             |
|--------|------------------|
| GET    | `/expenses`      |
| GET    | `/expenses/:id`  |
| POST   | `/expenses`      |
| PUT    | `/expenses/:id`  |
| DELETE | `/expenses/:id`  |

### Dashboard *(requer token)*
| Método | Rota                                | Resposta                                   |
|--------|-------------------------------------|--------------------------------------------|
| GET    | `/dashboard/total-expenses`         | `{ "total": 3500.50 }`                     |
| GET    | `/dashboard/expenses-count`         | `{ "quantidade": 45 }`                     |
| GET    | `/dashboard/expenses-by-category`   | `[{ "categoria": "...", "total": 0 }]`     |

---

## Filtros de Despesas

A rota `GET /expenses` aceita filtros via query string:

- `status` — `PENDENTE` ou `PAGA`
- `categoria` — id da categoria
- `dataInicio` / `dataFim` — período (AAAA-MM-DD)
- `valorMin` / `valorMax` — faixa de valor

Exemplo:

```http
GET /expenses?status=PAGA&categoria=<id>&valorMin=100&valorMax=500
```

---

## Autenticação

Envie o token retornado no login no cabeçalho das rotas protegidas:

```http
Authorization: Bearer <seu_token_jwt>
```

---

## Entidades

- **Usuário**: id, nome, email, senha, createdAt, updatedAt
- **Categoria**: id, nome, descricao
- **Despesa**: id, descricao, valor, data, status (`PENDENTE`/`PAGA`), categoriaId, usuarioId

### Relacionamentos
- Um usuário possui várias despesas.
- Uma categoria possui várias despesas.
- Uma despesa pertence a um usuário e a uma categoria.
