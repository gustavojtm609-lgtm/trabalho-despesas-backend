const express = require('express');
const UserView = require('../views/user');

// Agrupa todas as rotas relacionadas à autenticação de usuários
const router = express.Router();

// Cadastro de novo usuário (Nome, Email e Senha)
router.post('/users', (req, res) => UserView.create(req, res));

// Login que valida as credenciais e devolve o Token JWT
router.post('/auth/login', (req, res) => UserView.login(req, res));

module.exports = router;
