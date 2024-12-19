const criptosService = require('../services/criptosService');

exports.getCriptos = async (req, res) => {
    const { ticker } = req.params;

    try {
        const criptoData = await criptosService.getCriptosService(ticker);
        if (!criptoData) {
            return res.status(404).send({ error: 'Cripto não encontrada' });
        }
        return res.send(criptoData);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
