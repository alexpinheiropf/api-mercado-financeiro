const express = require('express');
const { getBonds } = require('../controllers/bondsController');

const router = express.Router();

// Rota para obter dados de títulos públicos
router.get('/:ticker', getBonds);

module.exports = router;
