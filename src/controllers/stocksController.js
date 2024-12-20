const stocksService = require('../services/stocksService');

exports.getStocksController = async (req, res) => {
    const { ticker } = req.params;
    console.log(`[INFO] Recupera parâmetro em getStocksController ::: ${ticker}`)

    try {
        const stockData = await stocksService.getStocksService(ticker);
        if (!stockData) {
            console.log(`[ERROR] Ativo não encontrado ::: ${stockData}`)
            return res.status(404).send({ error: 'Ativo não encontrado' });
        }
        return res.send(stockData);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
