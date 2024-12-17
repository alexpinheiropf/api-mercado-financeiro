const apiTesouroDireto = require('../config/api-radar-opcoes').apiTesouroDireto;
const replacetoLowerCase = require('../utils/replacetoLowerCase');

exports.getBondByTicker = async (ticker) => {
    const { response } = await apiTesouroDireto();
    const dataApiTreasury = response.TrsrBdTradgList;

    // Função para formatar os dados do bond
    const formatBondData = (bond) => {
        const price = bond.untrInvstmtVal === 0 ? bond.untrRedVal : bond.untrInvstmtVal;
        return {
            name: bond.nm,
            price,
            investment: 'Renda Fixa',
            group: 'Tesouro',
            segment: 'Tesouro Direto',
        };
    };

    if (ticker === 'all') {
        // Retorna todos os bonds formatados
        return dataApiTreasury.map(doc => formatBondData(doc.TrsrBd));
    }

    // Busca o bond específico
    const bond = dataApiTreasury.find(doc => replacetoLowerCase(doc.TrsrBd.nm) === ticker);

    // Retorna o bond formatado ou null se não encontrado
    return bond ? formatBondData(bond.TrsrBd) : null;
};
