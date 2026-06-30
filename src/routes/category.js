const express = require('express');
const CategoryView = require('../views/category');
const authMiddleware = require('../middlewares/auth');

// Agrupa as rotas RESTful do recurso Categoria
const router = express.Router();

// Protege todas as rotas de categorias exigindo Token JWT válido
router.use(authMiddleware);

router.get('/categories', (req, res) => CategoryView.getAll(req, res));
router.get('/categories/:id', (req, res) => CategoryView.getById(req, res));
router.post('/categories', (req, res) => CategoryView.create(req, res));
router.put('/categories/:id', (req, res) => CategoryView.update(req, res));
router.delete('/categories/:id', (req, res) => CategoryView.remove(req, res));

module.exports = router;
