const { getStocksModel } = require('../model/stocksModel');
const translateText = require('../utils/globalUtils').translateText;
const formattedCNPJ = require('../utils/stocksUtils').formattedCNPJ;

/**
 * Serviço para obter informações sobre ações com base no ticker fornecido.
 * @param {string} ticker - Código do ativo.
 * @returns {Promise<object>} Informações detalhadas sobre o ativo.
 */
exports.getStocksService = async (ticker) => {
    let cnpj = '', segment = '', description = '', dataInfo, jsonInfo;

    // Obtém o tipo de grupo (ex.: "Ação") baseado nos dados do modelo.
    const dataType = await getStocksModel(ticker, 'maisRetorno');
    console.log(`Retorna getStocksModel API maisRetorno :: ${dataType.data}`)

    const group = dataType.data.pageProps.headers.type === 'AÇÕES'
        ? 'Ação'
        : dataType.data.pageProps.headers.type;

    // Busca informações principais sobre o ativo.
    const dataStock = await getStocksModel(ticker, 'braipModules');
    console.log(`Retorna getStocksModel API braipModules :: ${dataStock.results[0]}`)

    // Valida a existência de resultados.
    if (!dataStock.results || !Array.isArray(dataStock.results)) {
        throw new Error("Sem resultados.");
    }

    // Extrai o primeiro item do array de resultados.
    const stock = dataStock.results[0];
    if (!stock) {
        throw new Error("Nenhum dado disponível.");
    }

    // Desestrutura os campos relevantes do ativo.
    const { longName: name, regularMarketPrice: price } = stock;

    // Obtém informações adicionais com base no grupo identificado.
    if (group === 'Ação') {
        // Se for uma ação, busca informações detalhadas específicas.
        jsonInfo = await getStocksModel(ticker, 'analiseAcoes', 'acoes');
        dataInfo = JSON.parse(jsonInfo);
        console.log(`Retorna getStocksModel API analiseAcoes/acoes :: ${dataInfo}`)

        cnpj = dataInfo.document;
        segment = dataInfo.sectorName;
        description = dataInfo.about || dataInfo.aboutHistory;
    } else if (group === 'FII') {
        jsonInfo = await getStocksModel(ticker, 'analiseAcoes', 'fiis');
        dataInfo = JSON.parse(jsonInfo);
        console.log(`Retorna getStocksModel API analiseAcoes/fiis :: ${dataInfo}`)

        cnpj = dataInfo.document;
        segment = `Fundo de ${dataInfo.type} - Segmento de ${dataInfo.segmentName}`
        description = dataInfo.aboutHistory;

    } else if (group === 'ETF') {
        cnpj = formattedCNPJ(dataType.data.pageProps.headers.cnpj)
        segment = name

    } else {
        // Para outros grupos, traduz e ajusta informações do perfil resumido.
        segment = stock.summaryProfile?.industry
            ? await translateText(stock.summaryProfile.industry)
            : '';
        description = stock.summaryProfile?.longBusinessSummary
            ? await translateText(stock.summaryProfile.longBusinessSummary)
            : '';
    }

    // Retorna as informações formatadas como objeto.
    return {
        name,
        ticker: ticker.toUpperCase(),
        price,
        segment,
        description,
        investment: 'Renda Variável',
        group,
        cnpj
    };
};
