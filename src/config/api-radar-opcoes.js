const axios = require("axios");
require('dotenv').config();

const axiosInstance = axios.create({
  baseURL: process.env.API_RADAR_OPCOES_URL,
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${process.env.API_RADAR_OPCOES_TOKEN}`,
    'x-api-key': process.env.API_RADAR_OPCOES_TOKEN,
    'Accept': 'application/json'
  },
  httpAgent: new (require('http').Agent)({ keepAlive: true }),
  httpsAgent: new (require('https').Agent)({ keepAlive: true }),
});

const apiRadarOpcoes = async (path = '/bonds.json') => {
  console.log(`Monta a URL de acesso da apiRadarOpcoes ${process.env.API_RADAR_OPCOES_URL}${path}`)
  try {
    const response = await axiosInstance.get(path);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar informação da API Radar Opções:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = apiRadarOpcoes;