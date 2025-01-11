const express = require('express');
const { getStatusController } = require('../controllers/statusController');

const router = express.Router();

// Rota para obter dados de títulos públicos
router.get('/', getStatusController);

module.exports = router;
