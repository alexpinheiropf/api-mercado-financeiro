const express = require('express');
const { getCriptos } = require('../controllers/criptoController');

const router = express.Router();

// Rota para obter dados de títulos públicos
router.get('/:ticker', getCriptos);

module.exports = router;
