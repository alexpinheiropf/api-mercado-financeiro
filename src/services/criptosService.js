const getCriptoModel = require('../model/criptoModel');
const { translateText } = require('../utils/globalUtils');
const { getCryptoPrice, getDataCripto, getSegmentCripto } = require('../utils/criptoUtils');
require('dotenv').config();

/**
 * Serviço para obter informações sobre criptomoedas com base no ticker fornecido.
 * @param {string} ticker - Código da criptomoeda.
 * @returns {Promise<object|null>} Informações detalhadas sobre a criptomoeda ou null se ocorrer um erro.
 */
exports.getCriptosService = async (ticker) => {
    // Obtém informações gerais da criptomoeda pelo modelo.
    const dataCripto = await getCriptoModel(ticker, 'symbol');

    // Verifica se os dados retornados possuem a estrutura esperada.
    if (!dataCripto || !dataCripto.data) {
        console.error("JSON inválido ou estrutura inesperada.");
        return null;
    }

    // Extrai dados principais da criptomoeda.
    const cripto = getDataCripto(dataCripto);

    // Nome da criptomoeda.
    const name = cripto.name;

    let segment
    switch (ticker.toUpperCase()) {
        case 'BTC':
            segment = 'Bitcoin'
            break;

        case 'ETH':
        case 'XRP':
        case 'BCH':
        case 'LTC':
            segment = 'Altcoin'
            break;

        case 'USDT':
        case 'USDC':
        case 'BRZ':
        case 'BUSD':
        case 'TUSD':
        case 'GUSD':
        case 'PAX':
        case 'PAXG':
            segment = 'Stablecoin'
            break;

        default:
            // Segmento da criptomoeda (tradução e categorização).
            segment = await getSegmentCripto(cripto);
    }


    // Descrição traduzida da criptomoeda.
    const description = await translateText(cripto.description);

    // Obtém o preço da criptomoeda com base no ID e ticker.
    const dataPrice = await getCriptoModel(ticker, 'convert', cripto.id);
    const price = getCryptoPrice(dataPrice.data);

    // Retorna as informações formatadas como objeto.
    return {
        name,
        ticker: ticker.toUpperCase(),
        price,
        segment,
        description,
        investment: 'Renda Variável',
        group: 'Cripto',
    };
};
