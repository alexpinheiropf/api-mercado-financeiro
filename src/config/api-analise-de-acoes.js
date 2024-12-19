const axios = require("axios")
require('dotenv').config();

const apiAnaliseAcoes = async (ticker, type) => {
  const url = `${process.env.API_ANALISE_DE_ACOES_URL}/page-data/${type}/${ticker}/page-data.json`

  try {
    const response = await axios.get(url);

    return response.data.result.pageContext.data;
  } catch (error) {
    throw new Error('Ocorreu um erro ao fazer a requisição:', error);
  }
}

module.exports = apiAnaliseAcoes;