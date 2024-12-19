const apiCoinMarketingCap = require('../config/api-coinmarketingcap');

const getCriptoModel = async (ticker, param, id) => {
    let responseData;

    switch (param) {
        case 'symbol':
            responseData = await apiCoinMarketingCap(
                ticker,
                process.env.API_COIN_MARKETING_CAP_INFO,
                param
            );
            break;

        case 'convert':
            responseData = await apiCoinMarketingCap(
                'BRL',
                process.env.API_COIN_MARKETING_CAP_PRICE,
                param,
                id
            )
            break;

        default:
            throw new Error('Parâmetro inválido fornecido.');
    }
    return responseData;
};

module.exports = getCriptoModel;
