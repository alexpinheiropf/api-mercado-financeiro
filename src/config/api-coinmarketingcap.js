require('dotenv').config();
const axios = require("axios");

const apiCoinMarketingCap = async (ticker, api, param, id) => {
    try {
        const params = {
            [param]: ticker,
        };

        // Verifica se o id foi fornecido e adiciona ao params
        if (id) {
            params['id'] = id;
        }

        const response = await axios.get(process.env.API_COIN_MARKETING_CAP_URL + api, {
            headers: {
                'X-CMC_PRO_API_KEY': process.env.API_COIN_MARKETING_CAP_KEY
            },
            params: params,
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar categorias de cripto:', error.message);
        throw error;
    }
};

module.exports = apiCoinMarketingCap; // Exporta diretamente a função

