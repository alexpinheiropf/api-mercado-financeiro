const express = require('express');
const bondsRoutes = require('./bondsRoutes');
const criptosRoutes = require('./criptosRoutes');
const stockOptionsRoutes = require('./stockOptionsRoutes');
const stocksRoutes = require('./stocksRoutes');

const router = express.Router();

// Agrupando as rotas principais
router.use('/bonds', bondsRoutes);
router.use('/criptos', criptosRoutes);
router.use('/stockoptions', stockOptionsRoutes);
router.use('/stocks', stocksRoutes);

module.exports = router;
