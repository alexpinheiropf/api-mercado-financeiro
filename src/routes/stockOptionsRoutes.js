const express = require('express');
const { getStockOptions } = require('../controllers/stockOptionsController');

const router = express.Router();

// Rota para obter o preço da opção
router.get('/:ticker', getStockOptions);

module.exports = router;
