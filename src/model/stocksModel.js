const apiBrapi = require('../config/api-brapi');
const apiAnaliseAcoes = require('../config/api-analise-de-acoes');
const apiFelixNaBolsa = require('../config/api-felix-na-bolsa');
const apiMaisRetorno = require('../config/api-mais-retorno');

require('dotenv').config();

exports.getStocksModel = async (ticker, param, type) => {
    console.log(`[INFO] Recupera parâmetros getStocksModel ::: ${ticker}, ${param}, ${type}`)
    let responseData;

    switch (param) {
        case 'braipModules':
            responseData = await apiBrapi(
                ticker,
                process.env.API_BRAPI_INFO,
                process.env.PARAM_BRAPI_MODULES,
                'summaryProfile'
            );
            break;

        case 'braipSearch':
            responseData = await apiBrapi(
                'list',
                process.env.API_BRAPI_INFO,
                process.env.PARAM_BRAPI_SEARCH,
                ticker
            );
            break;

        case 'analiseAcoes':
            responseData = await apiAnaliseAcoes(
                ticker,
                type
            );
            break;

        case 'maisRetorno':
            responseData = await apiMaisRetorno(
                ticker,
                process.env.API_MAIS_RETORNO_INFO
            );
            break;

        case 'felixNaBolsa':
            responseData = await apiFelixNaBolsa(
                ticker
            );
            break;

        default:
            throw new Error('Parâmetro inválido fornecido.');
    }
    return responseData;
};
