const axios = require("axios");
const NodeCache = require("node-cache");
require("dotenv").config();

// Inicializa o cache com um tempo de expiração padrão de 5 minutos
const cache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

const apiAnaliseAcoes = async (ticker, type) => {
  const url = `${process.env.API_ANALISE_DE_ACOES_URL}/page-data/${type}/${ticker}/page-data.json`;
  console.log(`[INFO] Monta a URL de acesso da API: ${url}`);

  // Verifica se os dados já estão no cache
  const cacheKey = `${type}-${ticker}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("[INFO] Dados encontrados no cache.");
    return cachedData;
  }

  // Função de tentativa de requisição com retry
  const makeRequest = async (retryCount = 3) => {
    try {
      console.log("[INFO] Iniciando requisição para a API...");
      const response = await axios.get(url, {
        headers: {
          "User-Agent": "PostmanRuntime/7.43.0",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
        },
        timeout: 10000, // Tempo limite de 10 segundos para evitar timeouts curtos
      });

      console.log(`[SUCCESS] Requisição bem-sucedida. Status: ${response.status}`);

      // Armazena a resposta no cache
      const resultData = response.data.result.pageContext.data;
      cache.set(cacheKey, resultData);

      return resultData;
    } catch (error) {
      if (retryCount > 0) {
        console.warn(`[WARN] Tentativa falhou, restam ${retryCount} tentativas...`);
        return makeRequest(retryCount - 1); // Recursão para tentativa novamente
      }

      console.error("[ERROR] Erro ao acessar a API:", {
        message: error.message,
        stack: error.stack,
        response: error.response ? error.response.data : null,
        status: error.response ? error.response.status : null,
      });

      if (error.code === "ECONNABORTED") {
        console.error("[ERROR] Timeout na requisição da API.");
      }

      throw new Error("Erro ao buscar informação da API Análise de Ações.");
    }
  };

  // Faz a tentativa inicial (e com retries, se necessário)
  return await makeRequest();
};

module.exports = apiAnaliseAcoes;
