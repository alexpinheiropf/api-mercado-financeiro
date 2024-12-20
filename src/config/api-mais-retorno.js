const axios = require("axios");

const apiMaisRetorno = async (ticker, api) => {
  const url = `${process.env.API_MAIS_RETORNO_URL}${api}${ticker}.json`;
  console.log(`Monta a URL de acesso da apiMaisRetorno ${url}`)
  try {
    const response = await axios.get(url);
    return response; // Retornando a resposta da API
  } catch (error) {
    console.error('Erro ao buscar informação da API Mais Retorno:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = apiMaisRetorno;
