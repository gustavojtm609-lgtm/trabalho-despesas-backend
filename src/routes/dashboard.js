const express = require('express');
const ExpenseView = require('../views/expense');
const authMiddleware = require('../middlewares/auth');

// Agrupa as rotas das APIs estatísticas (Dashboard)
const router = express.Router();

// Protege todas as rotas do dashboard exigindo Token JWT válido
router.use(authMiddleware);

// Soma total de gastos do usuário -> { "total": 3500.50 }
router.get('/dashboard/total-expenses', (req, res) => ExpenseView.getTotal(req, res));

// Quantidade de despesas do usuário -> { "quantidade": 45 }
router.get('/dashboard/expenses-count', (req, res) => ExpenseView.getCount(req, res));

// Gastos agrupados por categoria -> [{ "categoria": "...", "total": 0 }]
router.get('/dashboard/expenses-by-category', (req, res) => ExpenseView.getByCategory(req, res));

module.exports = router;
