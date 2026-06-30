# Documento de Pendências e Guia de Testes

Sistema de Controle de Despesas — API RESTful (Node.js + Express + Sequelize + MySQL)
Branch: **dev**

---

## 1. O que já foi feito

- Estrutura MVC completa: `controller/`, `views/`, `model/`, `routes/`, `middlewares/`, `config/`, `database/`.
- Autenticação com **JWT** + senhas com **bcrypt**.
- Models Sequelize (Usuário, Categoria, Despesa) com **associações** e **validações**.
- Rotas RESTful de Auth, Categorias, Despesas e Dashboard.
- **Filtros** de despesas (status, categoria, período, valor mínimo/máximo).
- **Migrations** e **Seeders** (Sequelize CLI).
- Middleware de **autenticação** e **tratamento global de erros**.
- README atualizado.

---

## 2. O que ainda falta fazer

### Obrigatório / pré-requisito para testar
| Item | Status | Observação |
|------|--------|------------|
| MySQL rodando + banco `mvc` criado | ⏳ Pendente | Necessário para migrations/seeders e para a API funcionar. |
| Rodar `npm run db:migrate` | ⏳ Pendente | Depende do MySQL ativo. Cria as tabelas. |
| Rodar `npm run db:seed` | ⏳ Pendente | Popula categorias e usuário demo. |
| Conferir credenciais no `.env` | ⏳ Verificar | Ajustar `DB_USER`/`DB_PASS` conforme seu MySQL. |

### Entregáveis pendentes
| Item | Status | Observação |
|------|--------|------------|
| **Collection Postman** | ❌ Não criado | Exportar uma collection `.json` com todas as rotas. |
| **Swagger** (opcional `*`) | ❌ Não criado | Documentação interativa em `/api-docs` (opcional no enunciado). |
| **Script SQL** | ⚠️ Parcial | As migrations cobrem isso; opcionalmente gerar um `.sql` puro. |

### Melhorias recomendadas (não obrigatórias)
- Validar `data` da despesa para não aceitar data no futuro (existia no mock antigo).
- Testes automatizados (o `npm test` ainda é placeholder).
- Resolver os 4 avisos de vulnerabilidade do `npm audit` (se exigido).

---

## 3. Pré-requisitos para testar

1. **Node.js** instalado.
2. **MySQL** rodando (XAMPP, WAMP, Docker ou serviço local).
3. Criar o banco de dados:
   ```sql
   CREATE DATABASE mvc;
   ```
4. Conferir o arquivo `.env` na raiz:
   ```env
   PORT=3000
   JWT_SECRET=sua_chave_secreta
   DB_NAME=mvc
   DB_USER=root
   DB_PASS=
   DB_HOST=localhost
   ```

---

## 4. Passo a passo para subir o projeto

```bash
# 1. Instalar dependências
npm install

# 2. Criar as tabelas no banco
npm run db:migrate

# 3. Popular dados de exemplo (categorias + usuário demo)
npm run db:seed

# 4. Iniciar o servidor
npm start
```

Servidor disponível em: `http://localhost:3000`

> Atalho: `npm run db:reset` desfaz tudo, recria as tabelas e popula novamente.

Usuário criado pelo seeder para testes:
- **email:** `admin@admin.com`
- **senha:** `123456`

---

## 5. Como testar cada rota

> Todas as rotas (exceto cadastro e login) exigem o cabeçalho:
> `Authorization: Bearer <token>`

### 5.1. Cadastro de usuário
```http
POST http://localhost:3000/users
Content-Type: application/json

{
  "nome": "Maria",
  "email": "maria@email.com",
  "senha": "123456"
}
```
**Esperado:** `201 Created` com `{ id, nome, email }`.

### 5.2. Login (obter o token)
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "admin@admin.com",
  "senha": "123456"
}
```
**Esperado:** `200 OK` com `{ user, token }`. **Copie o `token`** para usar nas próximas chamadas.

---

### 5.3. Categorias

**Listar:**
```http
GET http://localhost:3000/categories
Authorization: Bearer <token>
```

**Criar:**
```http
POST http://localhost:3000/categories
Authorization: Bearer <token>
Content-Type: application/json

{ "nome": "Saúde", "descricao": "Gastos médicos" }
```

**Buscar por id / Atualizar / Excluir:**
```http
GET    http://localhost:3000/categories/<id>
PUT    http://localhost:3000/categories/<id>
DELETE http://localhost:3000/categories/<id>
```

---

### 5.4. Despesas

**Criar** (use um `categoriaId` válido obtido na listagem de categorias):
```http
POST http://localhost:3000/expenses
Authorization: Bearer <token>
Content-Type: application/json

{
  "descricao": "Mercado",
  "valor": 250.90,
  "data": "2026-06-29",
  "status": "PAGA",
  "categoriaId": "<id-da-categoria>"
}
```
**Esperado:** `201 Created`.

**Listar / Buscar / Atualizar / Excluir:**
```http
GET    http://localhost:3000/expenses
GET    http://localhost:3000/expenses/<id>
PUT    http://localhost:3000/expenses/<id>
DELETE http://localhost:3000/expenses/<id>
```

---

### 5.5. Filtros de despesas

```http
GET http://localhost:3000/expenses?status=PAGA
GET http://localhost:3000/expenses?categoria=<id>
GET http://localhost:3000/expenses?valorMin=100&valorMax=500
GET http://localhost:3000/expenses?dataInicio=2026-06-01&dataFim=2026-06-30
```
Todos com `Authorization: Bearer <token>`.

---

### 5.6. Dashboard (estatísticas)

```http
GET http://localhost:3000/dashboard/total-expenses
GET http://localhost:3000/dashboard/expenses-count
GET http://localhost:3000/dashboard/expenses-by-category
```

**Respostas esperadas:**
```json
{ "total": 3500.50 }
```
```json
{ "quantidade": 45 }
```
```json
[
  { "categoria": "Alimentação", "total": 1200 },
  { "categoria": "Transporte", "total": 800 }
]
```

---

## 6. Testes de validação e segurança (casos de erro)

| Teste | Como reproduzir | Esperado |
|-------|-----------------|----------|
| Sem token | Chamar `/expenses` sem o cabeçalho Authorization | `401 Token não fornecido` |
| Token inválido | Enviar um token aleatório | `401 Token inválido` |
| E-mail duplicado | Cadastrar duas vezes o mesmo e-mail | `400 E-mail já cadastrado` |
| E-mail inválido | Cadastrar com `email: "abc"` | `400` (validação do model) |
| Valor inválido | Criar despesa com `valor: 0` | `400 O valor deve ser maior que zero` |
| Campo faltando | Criar despesa sem `descricao` | `400 Descrição, valor e categoria são obrigatórios` |
| Recurso inexistente | `GET /categories/<id-falso>` | `404 Categoria não encontrada` |

---

## 7. Ferramentas sugeridas para testar

- **Postman** ou **Insomnia** — criar uma collection com as requisições acima.
- **REST Client** (extensão do VS Code) — colar os blocos `http` deste documento em um arquivo `.http`.
- **Thunder Client** (extensão do VS Code).

---

## 8. Resumo final

| Etapa | Pronto? |
|-------|:-------:|
| Código da API (MVC, JWT, bcrypt, filtros, dashboard) | ✅ |
| Migrations e Seeders | ✅ |
| README | ✅ |
| Banco MySQL configurado e migrado | ⏳ você |
| Collection Postman | ❌ falta |
| Swagger (opcional) | ❌ falta |
