const axios = require("axios")

const api = axios.create({
    method: 'post',
    baseURL: 'https://statusinvest.com.br/',
    headers: { 
        'User-Agent': 'PostmanRuntime/7.29.2'
    }
})

module.exports = api