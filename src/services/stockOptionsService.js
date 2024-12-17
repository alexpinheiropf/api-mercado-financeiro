const apiStatusInvest = require('../config/api-status-invest');

exports.getStockOptionPrice = async (serieId) => {
    const { data } = await apiStatusInvest.get(`opcao/seriepremio?serieId=${serieId}`);
    const arrayValoresOpcao = data.prices;
    return arrayValoresOpcao.at(-1).price; // Retorna o último preço cotado
};
