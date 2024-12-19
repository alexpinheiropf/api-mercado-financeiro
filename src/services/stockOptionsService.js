const apiStatusInvest = require('../config/api-status-invest');
const { getLastPrice } = require('../utils/stocksOptionsUtils');

exports.getStockOptionService = async (ticker) => {
    const data = await apiStatusInvest(ticker);
    price = getLastPrice(data)

    return {
        name: '',
        ticker,
        price,
        segment: 'Derivativos',
        description: '',
        'investment': "Renda Variável",
        'group': "Opção de Ação",
    };
};