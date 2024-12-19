const replacetoLowerCase = require('../utils/globalUtils').replacetoLowerCase;
const getBondsModel = require('../model/bondsModel');

exports.getBondsService = async (ticker) => {
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

    if (ticker === 'all') {
        // Retorna todos os bonds formatados
        return dataApiTreasury.map(doc => formatBondData(doc.TrsrBd));
    }

    // Busca o bond específico
    const bond = dataApiTreasury.find(doc => replacetoLowerCase(doc.TrsrBd.nm) === ticker);

    // Retorna o bond formatado ou null se não encontrado
    return bond ? formatBondData(bond.TrsrBd) : null;
};
