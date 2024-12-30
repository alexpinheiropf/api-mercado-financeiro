const apiOlinda = require('../config/api-olinda');
const { format } = require("date-fns");

require('dotenv').config();

exports.getFinancialInstitutionsModel = async (financialInstitution) => {
    const today = new Date();
    const dateString = format(today, "MM-dd-yyyy");

    // Código da entidade no BC
    const cod = `codigoTipoEntidadeSupervisionada%20eq%20`
    const or = `%20or%20`

    let responseData;

    console.log(`[INFO] Recupera parâmetros getFinancialInstitutionsModel ::: ${financialInstitution}`)

    switch (financialInstitution) {
        // Emissores de Títulos de Renda Fixa
        case 'securitiesissuers':
            responseData = await apiOlinda(
                `${cod}'2'${or}${cod}'5'${or}${cod}'13'${or}${cod}'8'${or}${cod}'11'${or}${cod}'7'${or}${cod}'6'${or}${cod}'29'${or}${cod}'20'${or}${cod}'14'`,
                dateString,
            );
            break;

        // Corretoras, Distribuidoras ou Bancos de Valores Mobiliários
        case 'stockbrokers':
            responseData = await apiOlinda(
                `${cod}'6'${or}${cod}'15'${or}${cod}'16'`,
                dateString,
            );
            break;

        default:
            const instituition = encodeURIComponent(financialInstitution)
            responseData = await apiOlinda(
                instituition,
                dateString,
                'nomeReduzido%20eq%20'
            );
            break;
    }
    return responseData;
};
