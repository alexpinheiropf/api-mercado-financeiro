const axios = require("axios");
require("dotenv").config();

const apiBcb = async (id, data) => {
  const url = `${process.env.API_BCB_URL}/dados/serie/bcdata.sgs.${id}/dados?formato=json&dataInicial=${data}`;
  console.log(`[INFO] Monta a URL de acesso da API: ${url}`);

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
      timeout: 5000,  // Limite de tempo de 5 segundos
    });
    console.log(response.config.headers);

    console.log(`[SUCCESS] Requisição bem-sucedida. Status: ${response.status}`);

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
