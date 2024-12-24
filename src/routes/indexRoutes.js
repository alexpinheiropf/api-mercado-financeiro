const express = require('express');
const { getIndexController } = require('../controllers/indexController');

const router = express.Router();

// Rota para obter dados de títulos públicos
router.get('/:id', getIndexController);

module.exports = router;
