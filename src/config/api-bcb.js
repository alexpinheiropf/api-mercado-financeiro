const axios = require("axios");
const NodeCache = require("node-cache");
require("dotenv").config();

// Inicializa o cache com um tempo de expiração padrão de 5 minutos
const cache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

const apiBcb = async (id, data) => {
  const url = `${process.env.API_BCB_URL}/dados/serie/bcdata.sgs.${id}/dados?formato=json&dataInicial=${data}`;
  console.log(`[INFO] Monta a URL de acesso da API: ${url}`);

  // Verifica se os dados já estão no cache
  const cacheKey = `bcb-${id}-${data}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("[INFO] Dados encontrados no cache.");
    return cachedData;
  }

  try {
    console.log("[INFO] Iniciando requisição para a API...");
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'PostmanRuntime/7.43.0',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json'
      },
      timeout: 5000, // Limite de tempo de 5 segundos
    });
    console.log(`[SUCCESS] Requisição bem-sucedida. Status: ${response.status}`);

    // Armazena os dados no cache
    cache.set(cacheKey, response.data);

    return response.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error("[ERROR] A requisição excedeu o tempo limite de 5 segundos.");
    } else {
      console.error("[ERROR] Erro ao acessar a API:", {
        message: error.message,
        stack: error.stack,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      });
    }
    throw new Error("Erro ao buscar informação da API Banco Central do Brasil.");
  }
};

module.exports = apiBcb;
