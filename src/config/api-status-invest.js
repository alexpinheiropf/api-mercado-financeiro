require('dotenv').config();
const axios = require("axios");

const apiStatusInvest = async (ticker) => {
    const url = `${process.env.API_STATUS_INVEST_URL}${process.env.PARAM_API_STATUS_INVEST}`;
    try {
        const params = {
            serieId: ticker,
            type: 1
        };

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'PostmanRuntime/7.43.0'
            },
            params,
        });
        return response.data; // Retornando apenas os dados da resposta
    } catch (error) {
        console.error('Erro ao buscar informação da ação:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = apiStatusInvest;