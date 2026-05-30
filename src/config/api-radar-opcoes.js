const axios = require("axios")
require('dotenv').config();

const apiRadarOpcoes = async (path = '/bonds.json') => {
  console.log(`Monta a URL de acesso da apiRadarOpcoes ${process.env.API_RADAR_OPCOES_URL}${path}`)
  try {
    const response = await axios.get(process.env.API_RADAR_OPCOES_URL + path);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar informação da API Radar Opções:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = apiRadarOpcoes;