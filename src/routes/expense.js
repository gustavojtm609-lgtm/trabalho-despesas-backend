const express = require('express');
const ExpenseView = require('../views/expense');
const authMiddleware = require('../middlewares/auth');

// Agrupa as rotas RESTful do recurso Despesa
const router = express.Router();

// Protege todas as rotas de despesas exigindo Token JWT válido
router.use(authMiddleware);

router.get('/expenses', (req, res) => ExpenseView.getAll(req, res));
router.get('/expenses/:id', (req, res) => ExpenseView.getById(req, res));
router.post('/expenses', (req, res) => ExpenseView.create(req, res));
router.put('/expenses/:id', (req, res) => ExpenseView.update(req, res));
router.delete('/expenses/:id', (req, res) => ExpenseView.remove(req, res));

module.exports = router;
