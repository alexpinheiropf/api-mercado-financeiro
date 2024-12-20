const stocksService = require('../services/stocksService');

exports.getStocksController = async (req, res) => {
    const { ticker } = req.params;
    console.log(`Recupera parâmetro da requisição ${ticker}`)

    try {
        const stockData = await stocksService.getStocksService(ticker);
        if (!stockData) {
            return res.status(404).send({ error: 'Ação não encontrada' });
        }
        return res.send(stockData);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
