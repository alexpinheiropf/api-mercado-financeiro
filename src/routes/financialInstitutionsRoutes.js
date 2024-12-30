const express = require('express');
const { getFinancialInstitutionsController } = require('../controllers/financialInstitutionsController');

const router = express.Router();

// Rota para obter dados de títulos públicos
router.get('/:financialInstitution', getFinancialInstitutionsController);

module.exports = router;
