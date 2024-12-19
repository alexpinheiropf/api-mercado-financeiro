const axios = require("axios")

const apiCnpjEtf = async (ticker, api) => {
  const url = `${process.env.API_MAIS_RETORNO_URL}${api}${ticker}.json`;
  try {

    const response = await axios.get(url);

    return response; // Retornando apenas os dados da resposta
  } catch (error) {
    console.error('Erro ao buscar informação do ETF:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = apiCnpjEtf;