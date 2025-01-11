const statusService = require('../services/statusService');

exports.getStatusController = async (req, res) => {
    try {
        const stockData = await statusService.getStatusService();
        if (!stockData) {
            console.log(`[ERROR] Indice não encontrado ::: ${stockData}`)
            return res.status(404).send({ error: 'Indice não encontrado' });
        }
        return res.send(stockData);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
