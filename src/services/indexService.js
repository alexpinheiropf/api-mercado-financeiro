const { getIndexModel } = require('../model/indexModel');

/**
 * Serviço para obter informações sobre os indices
 * @param {string} id - Código do indice.
 * @returns {Promise<object|null>} Informações detalhadas sobre os indices
 */
exports.getIndexService = async (id) => {
    // Obtém o tipo de grupo (ex.: "Ação") baseado nos dados do modelo.
    const dataType = await getIndexModel(id, firstDayPreviousMonth());

    // Retorna as informações formatadas como objeto.
    return getLatestValue(dataType)
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
