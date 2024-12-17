const axios = require("axios")

exports.apiTesouroDireto = async () => {
  try {
    const response = await axios.get(process.env.API_RADAR_OPCOES_URL + '/bonds.json');
    return response.data;
  } catch (error) {
    throw new Error('Ocorreu um erro ao fazer a requisição:', error);
  }
}