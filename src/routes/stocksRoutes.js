const express = require('express');
const { getStocksController } = require('../controllers/stocksController');

const router = express.Router();

// Rota para obter dados de títulos públicos
router.get('/:ticker', getStocksController);

module.exports = router;
