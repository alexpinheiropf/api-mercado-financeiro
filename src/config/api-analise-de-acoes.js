const axios = require("axios")
require('dotenv').config();

const apiAnaliseAcoes = async (ticker, type) => {
  const url = `${process.env.API_ANALISE_DE_ACOES_URL}/page-data/${type}/${ticker}/page-data.json`
  console.log(`Monta a URL de acesso da apiAnaliseAcoes ${url}`)

  try {
    const response = await axios.get(url);

    return response.data.result.pageContext.data;
  } catch (error) {
    throw new Error('Erro ao buscar informação da API Análise de Ações:', error);
  }
}

module.exports = apiAnaliseAcoes;