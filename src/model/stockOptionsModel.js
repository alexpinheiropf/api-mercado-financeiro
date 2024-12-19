const apiStatusInvest = require('../config/api-status-invest');

const getStockOptionsModel = async (ticker) => {

    const { response } = await apiStatusInvest(ticker);
    return response;

};

module.exports = getStockOptionsModel;
