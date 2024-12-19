const apiRadarOpcoes = require('../config/api-radar-opcoes');

const getBondsModel = async () => {

    const { response } = await apiRadarOpcoes();
    return response.TrsrBdTradgList;

};

module.exports = getBondsModel;
