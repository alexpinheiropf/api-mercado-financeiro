const { getFinancialInstitutionsModel } = require('../model/financialInstitutionsModel');
const { formattedCNPJ } = require('../utils/globalUtils');
const { regexBrokers } = require('../utils/financialInstitutionUtils');

/**
 * Serviço para obter informações sobre instituições financeiras
 * @returns {Promise<object|null>} 
 */
exports.getfinancialInstitutionsService = async (financialInstitution) => {
    const data = await getFinancialInstitutionsModel(financialInstitution)

    if (data.value.length === 1) {
        return {
            id: data.value[0].codigoSisbacen,
            name: data.value[0].nomeEntidadeInteresse,
            ticker: regexBrokers(data.value[0].nomeReduzido),
            segment: data.value[0].descricaoTipoEntidadeSupervisionada,
            description: data.value[0].descricaoNaturezaJuridica,
            cnpj: formattedCNPJ(data.value[0].codigoCNPJ14)
        }
    } else {
        let financialInstitutions = []
        // Itera sobre os itens do array "value"
        for (let item of data.value) {
            if (item.codigoSisbacen !== null) {

                // Adiciona os campos extraídos no array
                financialInstitutions.push({
                    id: item.codigoSisbacen,
                    name: item.nomeEntidadeInteresse,
                    ticker: regexBrokers(item.nomeReduzido),
                    segment: item.descricaoTipoEntidadeSupervisionada,
                    description: item.descricaoNaturezaJuridica,
                    cnpj: formattedCNPJ(item.codigoCNPJ14)
                });
            }
        }
        // Ordenando pelo 'ticker'
        financialInstitutions.sort((a, b) => {
            return a.ticker.localeCompare(b.ticker, 'pt', { sensitivity: 'base' });
        });

        return financialInstitutions
    }

};
