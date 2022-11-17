const axios = require("axios")

const api = axios.create({
    method: 'get',
    baseURL: 'https://statusinvest.com.br/opcao/',
    headers: { 
        'User-Agent': 'PostmanRuntime/7.29.2'
    }
})

module.exports = api