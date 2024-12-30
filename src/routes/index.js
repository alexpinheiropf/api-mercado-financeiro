const express = require('express');
const bondsRoutes = require('./bondsRoutes');
const criptosRoutes = require('./criptosRoutes');
const stockOptionsRoutes = require('./stockOptionsRoutes');
const stocksRoutes = require('./stocksRoutes');
const indexRoutes = require('./indexRoutes');
const financialInstitutionsRoutes = require('./financialInstitutionsRoutes');

const router = express.Router();

// Agrupando as rotas principais
router.use('/bonds', bondsRoutes);
router.use('/criptos', criptosRoutes);
router.use('/stockoptions', stockOptionsRoutes);
router.use('/stocks', stocksRoutes);
router.use('/index', indexRoutes);
router.use('/financialinstitutions', financialInstitutionsRoutes);

module.exports = router;
