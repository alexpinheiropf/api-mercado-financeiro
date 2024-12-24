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
        const dataApiTreasury = await getBondsModel();

        // Função para formatar os dados do bond
        const formatBondData = (bond) => {
            const price = bond.untrInvstmtVal === 0 ? bond.untrRedVal : bond.untrInvstmtVal;
            return {
                name: bond.nm,
                price,
                segment: 'Tesouro Direto',
                description: bond.featrs,
                investment: 'Renda Fixa',
                group: 'Tesouro',
            };
        };

        let result;

        if (ticker === 'all') {
            // Retorna todos os bonds formatados
            result = dataApiTreasury.map(doc => formatBondData(doc.TrsrBd));
        } else {
            // Busca o bond específico
            const bond = dataApiTreasury.find(doc => replacetoLowerCase(doc.TrsrBd.nm) === ticker);

            // Retorna o bond formatado ou null se não encontrado
            result = bond ? formatBondData(bond.TrsrBd) : null;
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
