const apiRadarOpcoes = require('../config/api-radar-opcoes');

const getBondsModel = async (bondName) => {
    // Se não for informado bondName, busca a lista completa (/bonds.json)
    if (!bondName || bondName === 'all') {
        const data = await apiRadarOpcoes('/bonds.json');
        return data.response.TrsrBdTradgList;
    }

    // Para bond específico, chama /bonds/{bondName}
    const encodedName = encodeURIComponent(bondName);
    const data = await apiRadarOpcoes(`/bonds/${encodedName}`);
    return data; // retorna o objeto com campos como unitaryRedemptionValue
};

module.exports = getBondsModel;
