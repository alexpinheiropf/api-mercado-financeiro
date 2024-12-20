const axios = require("axios")
require('dotenv').config();

const apiRadarOpcoes = async () => {
  console.log(`Monta a URL de acesso da apiBrapi ${process.env.API_RADAR_OPCOES_URL}/bonds.json`)
  try {
    const response = await axios.get(process.env.API_RADAR_OPCOES_URL + '/bonds.json');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar informação da API Radar Opções:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = apiRadarOpcoes;