const express = require('express');
const stockOptionsRoutes = require('./stockOptionsRoutes');
const bondsRoutes = require('./bondsRoutes');
const criptoRoutes = require('./criptosRoutes');

const router = express.Router();

// Agrupando as rotas principais
router.use('/stockoptions', stockOptionsRoutes);
router.use('/bonds', bondsRoutes);
router.use('/criptos', criptoRoutes);

module.exports = router;
