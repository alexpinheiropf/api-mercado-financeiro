const apiBcb = require('../config/api-bcb');

require('dotenv').config();

exports.getIndexModel = async (ticker, param) => {
    console.log(`[INFO] Recupera parâmetros getStocksModel ::: ${ticker}, ${param}`)

    return await apiBcb(ticker, param);
};
