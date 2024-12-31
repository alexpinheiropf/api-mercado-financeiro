const axios = require("axios");
const NodeCache = require("node-cache");
require("dotenv").config();

// Configuração do cache com tempo de expiração de 10 minutos
const cache = new NodeCache({ stdTTL: 600 }); // 600 segundos = 10 minutos

// Instância Axios personalizada
const apiClient = axios.create({
  timeout: 5000, // Timeout de 5 segundos
  headers: {
    'User-Agent': 'PostmanRuntime/7.43.0',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
  },
});

const apiOlinda = async (param, date, filter) => {
  try {
    // Verificar se a resposta já está no cache
    const cacheKey = `${param}_${date}_${filter}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      console.log("[INFO] Dados obtidos do cache.");
      return cachedData;
    }

    // Montar a URL dinamicamente
    const baseUrl = process.env.API_OLINDA_URL;
    const version = process.env.API_OLINDA_VERSION;
    const dataBase = 'dataBase=@dataBase';
    const dataBaseParam = `@dataBase='${date}'`;
    const topParam = '$top=5000';
    const filterParam = filter !== undefined ? `$filter=contains(${filter},'${param}')` : `$filter=${param}`;
    const formatParam = '$format=json';
    const selectParam = `$select=${process.env.API_OLINDA_FILTER}`;
    const url = `${baseUrl}/${version}(${dataBase})?${dataBaseParam}&${topParam}&${filterParam}&${formatParam}&${selectParam}`;

    console.log(`[INFO] Monta a URL de acesso da API: ${url}`);
    // contains(nomeReduzido,'NU%20INVEST')
    // Fazer a requisição
    console.log("[INFO] Iniciando requisição para a API...");
    const response = await apiClient.get(url);

    console.log(`[SUCCESS] Requisição bem-sucedida. Status: ${response.status}`);

    // Armazenar a resposta no cache
    cache.set(cacheKey, response.data);

    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error("[ERROR] Timeout na requisição para a API Olinda.");
      throw new Error("Timeout ao acessar a API Olinda.");
    }

    console.error("[ERROR] Erro ao acessar a API:", {
      message: error.message,
      stack: error.stack,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error("Erro ao buscar informação da API Olinda Banco Central.");
  }
};

module.exports = apiOlinda;
