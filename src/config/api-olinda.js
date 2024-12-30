const axios = require("axios");
const NodeCache = require("node-cache");
require("dotenv").config();

// Criar uma instância do cache com tempo de expiração de 10 minutos (600 segundos)
const cache = new NodeCache({ stdTTL: 600 }); // 600 segundos = 10 minutos

const apiOlinda = async (param, date, filter) => {
  // URL Base
  const baseUrl = process.env.API_OLINDA_URL;
  const version = process.env.API_OLINDA_VERSION;
  const dataBase = 'dataBase=@dataBase';

  // Parâmetros URL
  const dataBaseParam = `@dataBase='${date}'`;
  const topParam = '$top=100000';
  const filterParam = filter !== undefined ? `$filter=${filter}'${param}'` : `$filter=${param}`;
  const formatParam = '$format=json';
  const selectParam = `$select=${process.env.API_OLINDA_FILTER}`;

  const url = `${baseUrl}/${version}(${dataBase})?${dataBaseParam}&${topParam}&${filterParam}&${formatParam}&${selectParam}`;
  console.log(`[INFO] Monta a URL de acesso da API: ${url}`);

  // Verificar se a resposta já está no cache
  const cacheKey = `${param}_${date}_${filter}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("[INFO] Dados obtidos do cache.");
    return cachedData;
  }

  try {
    console.log("[INFO] Iniciando requisição para a API...");
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.43.0',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      },
    });

    console.log(`[SUCCESS] Requisição bem-sucedida. Status: ${response.status}`);

    // Armazenar a resposta no cache
    cache.set(cacheKey, response.data);

    return response.data;
  } catch (error) {
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
