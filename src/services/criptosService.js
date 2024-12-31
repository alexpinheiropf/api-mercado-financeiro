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
    try {
        const normalizedTicker = ticker.toUpperCase();

        // Obtém informações gerais da criptomoeda pelo modelo.
        const dataCripto = await getCriptoModel(normalizedTicker, 'symbol');
        if (!dataCripto?.data) {
            console.error("JSON inválido ou estrutura inesperada.");
            return null;
        }

        const cripto = getDataCripto(dataCripto);

        // Mapeia segmentos com base no ticker.
        const segmentTypes = {
            BTC: 'Bitcoin',
            ETH: 'Altcoin', XRP: 'Altcoin', BCH: 'Altcoin', LTC: 'Altcoin',
            USDT: 'Stablecoin', USDC: 'Stablecoin', BRZ: 'Stablecoin',
            BUSD: 'Stablecoin', TUSD: 'Stablecoin', GUSD: 'Stablecoin',
            PAX: 'Stablecoin', PAXG: 'Stablecoin'
        };

        const baseSegment = segmentTypes[normalizedTicker] || '';
        const segment = `${baseSegment ? baseSegment + ' - ' : ''}${await getSegmentCripto(cripto, segmentTypes[normalizedTicker])}`;

        // Descrição traduzida.
        const description = await translateText(cripto.description);

        // Obtém o preço da criptomoeda.
        const dataPrice = await getCriptoModel(normalizedTicker, 'convert', cripto.id);
        const price = getCryptoPrice(dataPrice?.data);

        // Retorna as informações formatadas.
        return {
            name: cripto.name,
            ticker: normalizedTicker,
            price,
            segment,
            description,
            investment: 'Renda Variável',
            group: 'Cripto',
        };
    } catch (error) {
        console.error("Erro ao obter informações da criptomoeda:", error);
        return null;
    }
};
