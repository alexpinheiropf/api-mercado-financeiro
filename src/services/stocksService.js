const { getStocksModel } = require('../model/stocksModel');
const translateText = require('../utils/globalUtils').translateText;
const extractText = require('../utils/stocksUtils').extractText;

const cache = {}; // Cache simples, pode ser melhorado com Redis ou outro mecanismo para persistência
const CACHE_EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutos em milissegundos

/**
 * Serviço para obter informações sobre ações com base no ticker fornecido.
 * @param {string} ticker - Código do ativo.
 * @returns {Promise<object>} Informações detalhadas sobre o ativo.
 */
exports.getStocksService = async (ticker) => {
    const upperTicker = ticker.toLocaleUpperCase();

    // Verifica se os dados do ticker estão no cache e se ainda não expiraram
    if (cache[upperTicker] && (Date.now() - cache[upperTicker].timestamp < CACHE_EXPIRATION_TIME)) {
        console.log("[INFO] Dados encontrados no cache.");
        return cache[upperTicker].data;
    }

    let cnpj = '', segment = '', description = '', dataInfo, jsonInfo;

    try {
        // Obtém o tipo de grupo (ex.: "Ação") baseado nos dados do modelo.
        const dataType = await getStocksModel(upperTicker, 'felixNaBolsa');
        const group = dataType.result.pageContext.ativo.classeAtivo === 'AÇÃO'
            ? 'Ação'
            : dataType.result.pageContext.ativo.classeAtivo;

        // Busca informações principais sobre o ativo.
        const dataStock = await getStocksModel(ticker, 'braipModules');
        if (!dataStock.results || !Array.isArray(dataStock.results)) {
            throw new Error("[ERROR] Sem resultados.");
        }

        // Extrai o primeiro item do array de resultados.
        const stock = dataStock.results[0];
        if (!stock) {
            throw new Error("[ERROR] Nenhum dado disponível.");
        }

        // Desestrutura os campos relevantes do ativo.
        const { longName: name, regularMarketPrice: price } = stock;

        // Obtém informações adicionais com base no grupo identificado.
        if (group === 'Ação') {
            jsonInfo = await getStocksModel(ticker.toLowerCase(), 'analiseAcoes', 'acoes');
            dataInfo = JSON.parse(jsonInfo);

            cnpj = dataInfo.document;
            segment = dataInfo.sectorName;
            description = dataInfo.about || extractText(dataInfo.aboutHistory);

        } else if (group === 'FII') {
            jsonInfo = await getStocksModel(ticker.toLowerCase(), 'analiseAcoes', 'fiis');
            dataInfo = JSON.parse(jsonInfo);

            cnpj = dataInfo.document;
            segment = `Fundo de ${dataInfo.type} - Segmento de ${dataInfo.segmentName}`;
            description = extractText(dataInfo.aboutHistory);

        } else if (group === 'ETF') {
            cnpj = dataType.result.pageContext.ativo.cnpj;
            segment = name;

        } else {
            segment = stock.summaryProfile?.industry
                ? await translateText(stock.summaryProfile.industry)
                : '';
            description = stock.summaryProfile?.longBusinessSummary
                ? await translateText(stock.summaryProfile.longBusinessSummary)
                : '';
        }

        // Cria o objeto com as informações completas
        const stockData = {
            name,
            ticker: upperTicker,
            price,
            segment,
            description,
            investment: 'Renda Variável',
            group,
            cnpj
        };

        // Armazena no cache com timestamp
        cache[upperTicker] = {
            timestamp: Date.now(),
            data: stockData
        };

        return stockData;

    } catch (error) {
        console.error("[ERROR] Ocorreu um erro ao buscar informações:", error.message);
        throw error;
    }
};
