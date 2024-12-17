const stockOptionsService = require('../services/stockOptionsService');

exports.getStockOptions = async (req, res) => {
    const { serieId } = req.params;

    try {
        const price = await stockOptionsService.getStockOptionPrice(serieId);
        return res.send({ price });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
