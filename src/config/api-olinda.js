const axios = require("axios");
require("dotenv").config();

const apiOlinda = async (param, date, filter) => {
  // URL Base
  const baseUrl = process.env.API_OLINDA_URL;
  const version = process.env.API_OLINDA_VERSION;
  const dataBase = 'dataBase=@dataBase'

  // Parâmetros URL
  const dataBaseParam = `@dataBase='${date}'`;
  const topParam = '$top=100000';
  const filterParam = filter !== undefined ? `$filter=${filter}'${param}'` : `$filter=${param}`
  const formatParam = '$format=json';
  const selectParam = `$select=${process.env.API_OLINDA_FILTER}`

  const url = `${baseUrl}/${version}(${dataBase})?${dataBaseParam}&${topParam}&${filterParam}&${formatParam}&${selectParam}`;
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
    throw new Error("Erro ao buscar informação da API Olinda Banco Central.");
  }
};

module.exports = apiOlinda;
