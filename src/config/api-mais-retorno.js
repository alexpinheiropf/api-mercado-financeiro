const axios = require("axios");

const apiMaisRetorno = async (ticker, api) => {
  const url = `${process.env.API_MAIS_RETORNO_URL}${api}${ticker}.json`;
  try {
    const response = await axios.get(url);
    return response; // Retornando a resposta da API
  } catch (error) {
    console.error('Erro ao buscar informação:', error.response?.data || error.message);

    // Verifica se o status é 500 ou outro erro e retorna um objeto padrão
    if (error.response?.status === 500) {
      return { error: 'Erro interno no servidor', status: 500 };
    }

    // Retorna o erro completo em caso de outro tipo de erro
    return { error: error.response?.data || error.message, status: error.response?.status || 500 };
  }
};

module.exports = apiMaisRetorno;
