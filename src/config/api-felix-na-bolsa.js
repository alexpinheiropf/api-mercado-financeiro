const axios = require("axios");
require("dotenv").config();

const apiFelixNaBolsa = async (ticker) => {
  const url = `${process.env.API_FELIX_NA_BOLA_URL}/page-data/ativo/${ticker}/page-data.json`;
  console.log(`[INFO] Monta a URL de acesso da API: ${url}`);

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
    console.log(response.config.headers);

    console.log(`[SUCCESS] Requisição bem-sucedida. Status: ${response.status}`);

    return response.data;
  } catch (error) {
    console.error("[ERROR] Erro ao acessar a API:", {
      message: error.message,
      stack: error.stack,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
    throw new Error("Erro ao buscar informação da API Félix na Bolsa.");
  }
};

module.exports = apiFelixNaBolsa;
