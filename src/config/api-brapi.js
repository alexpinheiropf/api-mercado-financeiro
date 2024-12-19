require('dotenv').config();
const axios = require("axios");

const apiStock = async (ticker, api, module, param) => {
    const url = `${process.env.API_BRAPI_URL}${api}${ticker}`;
    try {
        const params = {
            [module]: param,
        };

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.API_BRAPI_KEY}`,
            },
            params,
        });
        return response.data; // Retornando apenas os dados da resposta
    } catch (error) {
        console.error('Erro ao buscar informação da ação:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = apiStock;
