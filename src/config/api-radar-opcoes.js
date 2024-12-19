const axios = require("axios")

const apiRadarOpcoes = async () => {
  try {
    const response = await axios.get(process.env.API_RADAR_OPCOES_URL + '/bonds.json');
    return response.data;
  } catch (error) {
    throw new Error('Ocorreu um erro ao fazer a requisição:', error);
  }
}

module.exports = apiRadarOpcoes;