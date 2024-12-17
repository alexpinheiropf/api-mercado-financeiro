const axios = require("axios")

const apiStatusInvest = axios.create({
    method: 'post',
    baseURL: process.env.API_STATUS_INVEST_URL,
    headers: {
        'User-Agent': 'PostmanRuntime/7.29.2'
    }
});

module.exports = apiStatusInvest