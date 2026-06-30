const express = require('express');

// Importa cada grupo de rotas do sistema
const authRoutes = require('./auth');
const categoryRoutes = require('./category');
const expenseRoutes = require('./expense');
const dashboardRoutes = require('./dashboard');

// Roteador central que reúne e organiza todas as rotas da API
const router = express.Router();

// Encaixa cada conjunto de rotas no roteador principal
router.use(authRoutes);
router.use(categoryRoutes);
router.use(expenseRoutes);
router.use(dashboardRoutes);

module.exports = router;
