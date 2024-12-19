const stockOptionsService = require('../services/stockOptionsService');

exports.getStockOptions = async (req, res) => {
    const { ticker } = req.params;

    try {
        const price = await stockOptionsService.getStockOptionService(ticker);
        return res.send({ price });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
