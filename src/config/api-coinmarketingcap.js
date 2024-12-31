require('dotenv').config();
const axios = require("axios");
const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 600, checkperiod: 60 });

const cachedETag = {};
const axiosInstance = axios.create({
    baseURL: process.env.API_COIN_MARKETING_CAP_URL,
    headers: { 'X-CMC_PRO_API_KEY': process.env.API_COIN_MARKETING_CAP_KEY },
    timeout: 5000,
    httpAgent: new (require('http').Agent)({ keepAlive: true }),
    httpsAgent: new (require('https').Agent)({ keepAlive: true }),
});

const apiCoinMarketingCap = async (ticker, api, param, id) => {
    const params = { [param]: ticker };
    if (id) params['id'] = id;

    const cacheKey = `${api}-${ticker}-${param}-${id || 'no-id'}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) return cachedData;

    const headers = {};
    if (cachedETag[cacheKey]) headers['If-None-Match'] = cachedETag[cacheKey];

    try {
        const response = await axiosInstance.get(api, { params, headers });

        if (response.headers['etag']) cachedETag[cacheKey] = response.headers['etag'];

        cache.set(cacheKey, response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 304) return cache.get(cacheKey);
        throw error;
    }
};

module.exports = apiCoinMarketingCap;
