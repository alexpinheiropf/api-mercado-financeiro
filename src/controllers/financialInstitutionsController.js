const financialInstitutionsService = require('../services/financialInstitutionsService');

exports.getFinancialInstitutionsController = async (req, res) => {
    const { financialInstitution } = req.params;
    console.log(`[INFO] Recupera parâmetro em getFinancialInstitutionsController ::: ${financialInstitution}`)

    try {
        const stockData = await financialInstitutionsService.getfinancialInstitutionsService(financialInstitution);
        if (!stockData) {
            console.log(`[ERROR] Indice não encontrado ::: ${stockData}`)
            return res.status(404).send({ error: 'Indice não encontrado' });
        }
        return res.send(stockData);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
