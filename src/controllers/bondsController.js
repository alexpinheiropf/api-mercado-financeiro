const bondsService = require('../services/bondsService');

exports.getBonds = async (req, res) => {
    const { ticker } = req.params;

    try {
        const bondData = await bondsService.getBondsService(ticker);
        if (!bondData) {
            return res.status(404).send({ error: 'Titulo não encontrado' });
        }
        return res.send(bondData);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
