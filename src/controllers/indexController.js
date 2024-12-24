const indexService = require('../services/indexService');

exports.getIndexController = async (req, res) => {
    const { id } = req.params;
    console.log(`[INFO] Recupera parâmetro em getIndexController ::: ${id}`)

    try {
        const stockData = await indexService.getIndexService(id);
        if (!stockData) {
            console.log(`[ERROR] Indice não encontrado ::: ${stockData}`)
            return res.status(404).send({ error: 'Indice não encontrado' });
        }
        return res.send(stockData);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
