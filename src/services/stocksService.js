const { getStocksModel } = require('../model/stocksModel');
const translateText = require('../utils/globalUtils').translateText;
const extractText = require('../utils/stocksUtils').extractText;

const cache = {}; // Cache simples, pode ser melhorado com Redis ou outro mecanismo para persistência
const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 30 minutos em milissegundos

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
    const warnings = [];

    try {
        // Obtém o tipo de grupo (ex.: "Ação") baseado nos dados do modelo.
        let grupoClasseAtivo = '';
        try {
            const dataType = await getStocksModel(upperTicker, 'felixNaBolsa');
            grupoClasseAtivo = dataType?.result?.data?.apiServerFrontListarAtivos?.classeAtivo || '';
        } catch (e) {
            warnings.push(`felixNaBolsa: ${e.message}`);
            grupoClasseAtivo = '';
        }

        const group = grupoClasseAtivo === 'AÇÃO' ? 'Ação' : grupoClasseAtivo || '';

        // Busca informações principais sobre o ativo.
        let stock = {};
        try {
            const dataStock = await getStocksModel(ticker, 'braipModules');
            if (dataStock && Array.isArray(dataStock.results) && dataStock.results.length > 0) {
                stock = dataStock.results[0] || {};
            } else {
                warnings.push('braipModules: sem resultados');
                stock = {};
            }
        } catch (e) {
            warnings.push(`braipModules: ${e.message}`);
            stock = {};
        }

        // Desestrutura os campos relevantes do ativo (quando disponíveis).
        let name = stock?.longName || '';
        let price = stock?.regularMarketPrice;

        // Obtém informações adicionais com base no grupo identificado.
        if (group === 'Ação') {
            try {
                jsonInfo = await getStocksModel(ticker.toLowerCase(), 'analiseAcoes', 'acoes');
                dataInfo = JSON.parse(jsonInfo);

                if (!name && dataInfo?.name) {
                    name = dataInfo.name;
                }

                cnpj = dataInfo?.document || '';
                segment = dataInfo?.sectorName || '';
                description = dataInfo?.about || extractText(dataInfo?.aboutHistory || '');
            } catch (e) {
                warnings.push(`analiseAcoes(acoes): ${e.message}`);
            }

        } else if (group === 'FII') {
            try {
                jsonInfo = await getStocksModel(ticker.toLowerCase(), 'analiseAcoes', 'fiis');
                dataInfo = JSON.parse(jsonInfo);

                cnpj = dataInfo?.document || '';
                segment = dataInfo?.type ? `Fundo de ${dataInfo.type} - Segmento de ${dataInfo.segmentName || ''}` : dataInfo?.segmentName || '';
                description = extractText(dataInfo?.aboutHistory || '');
            } catch (e) {
                warnings.push(`analiseAcoes(fiis): ${e.message}`);
            }

        } else if (group === 'ETF') {
            try {
                const dataType = await getStocksModel(upperTicker, 'felixNaBolsa');
                cnpj = dataType?.result?.pageContext?.ativo?.cnpj || '';
                segment = name;
            } catch (e) {
                warnings.push(`felixNaBolsa(ETF): ${e.message}`);
            }

        } else {
            try {
                if (stock?.summaryProfile?.industry) {
                    segment = await translateText(stock.summaryProfile.industry).catch(t => { warnings.push(`translate industry: ${t.message}`); return ''; });
                }
                if (stock?.summaryProfile?.longBusinessSummary) {
                    description = await translateText(stock.summaryProfile.longBusinessSummary).catch(t => { warnings.push(`translate summary: ${t.message}`); return ''; });
                }
            } catch (e) {
                warnings.push(`summaryProfile: ${e.message}`);
            }
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

        if (warnings.length === 0) {
            cache[upperTicker] = {
                timestamp: Date.now(),
                data: stockData
            };
        } else {
            // Armazena no cache parcial também (opcional): substitua se quiser apenas cache completo
            cache[upperTicker] = {
                timestamp: Date.now(),
                data: stockData
            };
        }

        // Anexa avisos caso alguma API tenha falhado, mas retorna 200 com os dados parcialmente preenchidos
        if (warnings.length > 0) stockData.warnings = warnings;

        return stockData;

    } catch (error) {
        console.error("[ERROR] Ocorreu um erro inesperado ao buscar informações:", error.message);
        // Em caso de falha totalmente inesperada, retorne um objeto padrão com aviso, não lance.
        const fallback = {
            name: '',
            ticker: upperTicker,
            price: null,
            segment: '',
            description: '',
            investment: 'Renda Variável',
            group: '',
            cnpj: '',
            warnings: [error.message]
        };
        return fallback;
    }
};
