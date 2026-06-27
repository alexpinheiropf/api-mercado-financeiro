const replacetoLowerCase = require('../utils/globalUtils').replacetoLowerCase;
const getBondsModel = require('../model/bondsModel');

// Cache simples para armazenar os dados com tempo de expiração
const cache = {};
const CACHE_EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutos em milissegundos

exports.getBondsService = async (ticker) => {
    // Verifica se os dados estão no cache e se ainda não expiraram
    if (cache[ticker] && (Date.now() - cache[ticker].timestamp < CACHE_EXPIRATION_TIME)) {
        console.log("[INFO] Dados encontrados no cache.");
        return cache[ticker].data;
    }


    try {
        const dataApiTreasury = await getBondsModel(ticker === 'all' ? 'all' : ticker);

        // Formata itens quando a fonte é a lista tradicional (/bonds.json)
        const formatFromList = (doc) => {
            const bond = doc.TrsrBd;
            const price = (bond.untrInvstmtVal === 0 || bond.untrInvstmtVal == null) ? bond.untrRedVal : bond.untrInvstmtVal;
            return {
                name: bond.nm,
                price,
                segment: 'Tesouro Direto',
                description: bond.featrs,
                investment: 'Renda Fixa',
                group: 'Tesouro',
            };
        };

        // Formata quando a fonte é o endpoint /bonds/{name}
        const formatFromItem = (item) => {
            const price = item.unitaryRedemptionValue ?? item.untrRedVal ?? item.untrInvstmtVal ?? 0;
            const name = item.treasuryBondName ?? item.nm ?? item.treasuryBondName;
            return {
                name,
                price,
                segment: 'Tesouro Direto',
                description: item.indication ?? item.featrs,
                investment: 'Renda Fixa',
                group: 'Tesouro Direto',
            };
        };

        let result;

        if (ticker === 'all') {
            // Retorna todos os bonds formatados a partir da lista
            result = dataApiTreasury.map(doc => formatFromList(doc));
        } else {
            // dataApiTreasury deve ser o objeto do bond específico
            result = dataApiTreasury ? formatFromItem(dataApiTreasury) : null;
        }

        // Armazena no cache com timestamp
        cache[ticker] = {
            timestamp: Date.now(),
            data: result
        };

        return result;
    } catch (error) {
        console.error("[ERROR] Ocorreu um erro ao buscar informações:", error.message);
        throw error;
    }
};
