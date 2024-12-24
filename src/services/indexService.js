const { getIndexModel } = require('../model/indexModel');

// Cache simples para armazenar os dados com tempo de expiração
const cache = {};
const CACHE_EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutos em milissegundos

/**
 * Serviço para obter informações sobre os índices
 * @param {string} id - Código do índice.
 * @returns {Promise<object|null>} Informações detalhadas sobre os índices
 * CDI: 4389
 * SELIC: 432
 * IPCA: 13522
 */
exports.getIndexService = async (id) => {
    // Verifica se os dados do índice estão no cache e se ainda não expiraram
    if (cache[id] && (Date.now() - cache[id].timestamp < CACHE_EXPIRATION_TIME)) {
        console.log("[INFO] Dados encontrados no cache.");
        return cache[id].data;
    }

    try {
        // Obtém o tipo de grupo (ex.: "Ação") baseado nos dados do modelo.
        const dataType = await getIndexModel(id, firstDayPreviousMonth());

        // Obtém o valor mais recente dos dados
        const latestValue = getLatestValue(dataType);

        // Armazena no cache com timestamp
        cache[id] = {
            timestamp: Date.now(),
            data: latestValue
        };

        return latestValue;
    } catch (error) {
        console.error("[ERROR] Ocorreu um erro ao buscar informações:", error.message);
        throw error;
    }
};

function firstDayPreviousMonth() {
    const dataAtual = new Date();
    // Define o mês anterior, ajustando para 0-index (janeiro é 0)
    const primeiroDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 1, 1);

    const dia = String(primeiroDia.getDate()).padStart(2, '0'); // Formata o dia com 2 dígitos
    const mes = String(primeiroDia.getMonth() + 1).padStart(2, '0'); // Formata o mês com 2 dígitos
    const ano = primeiroDia.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

function getLatestValue(data) {
    // Formata a data para comparação e encontra a mais recente
    const latestEntry = data.reduce((latest, current) => {
        const latestDate = new Date(latest.data.split('/').reverse().join('-'));
        const currentDate = new Date(current.data.split('/').reverse().join('-'));
        return currentDate > latestDate ? current : latest;
    });

    return latestEntry;
}
