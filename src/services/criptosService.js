const apiCripto = require('../config/api-coinmarketingcap');
const getCriptoInfo = require('../utils/getCriptoInfo');
const getCryptoPrice = require('../utils/getCryptoPrice');

require('dotenv').config();

exports.getCripto = async (ticker) => {
    // Obtendo informações sobre a criptomoeda
    const dataInfo = await apiCripto(ticker, process.env.API_COIN_MARKETING_CAP_INFO, process.env.PARAM_COIN_MARKETING_CAP_CRIPTO);
    const info = await getCriptoInfo(dataInfo.data);

    // Obtendo o preço da criptomoeda
    const dataPrice = await apiCripto('BRL', process.env.API_COIN_MARKETING_CAP_PRICE, process.env.PARAM_COIN_MARKETING_CAP_CURRENCY, info.id);
    const returnPrice = getCryptoPrice(dataPrice.data);

    return {
        name: info.name,
        symbol: info.symbol,
        segment: info.category,
        description: info.description,
        price: returnPrice,
        investment: 'Renda Variável',
        group: 'Cripto'
    };
};
