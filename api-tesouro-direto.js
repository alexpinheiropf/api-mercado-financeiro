const axios = require("axios")

async function apiTesouroDireto() {
        try {
          const response = await axios.get('https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json');
          return response.data;
        } catch (error) {
          throw new Error('Ocorreu um erro ao fazer a requisição:', error);
        }
      }
      
module.exports = { apiTesouroDireto };