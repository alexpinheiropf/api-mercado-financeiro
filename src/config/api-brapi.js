require('dotenv').config();
const axios = require("axios");

const apiBrapi = async (ticker, api, module, param) => {
    const url = `${process.env.API_BRAPI_URL}${api}${ticker}`;
    console.log(`[INFO] Monta a URL de acesso da apiBrapi ::: ${url}`)
    try {
        const params = {
            [module]: param,
        };

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.API_BRAPI_KEY}`,
            },
            params,
        });
        return response.data; // Retornando apenas os dados da resposta
    } catch (error) {
        const erro = error.response?.data.message

        // Expressão regular ajustada para 4 ou 5 letras maiúsculas seguidas de um número
        const regex = /\b[A-Z]{4,5}\d\b/;
        const stock = erro.match(regex)

        // Valida se ativo existia anteriormente
        switch (stock[0]) {
            case 'ENBR3':
                const responseReturn = {
                    "results": [
                        {
                            "currency": "BRL",
                            "shortName": "",
                            "longName": "",
                            "regularMarketChange": 0,
                            "regularMarketChangePercent": 0,
                            "regularMarketTime": "",
                            "regularMarketPrice": 0,
                            "regularMarketDayHigh": 0,
                            "regularMarketDayRange": "0",
                            "regularMarketDayLow": 0,
                            "regularMarketVolume": 0,
                            "regularMarketPreviousClose": 0,
                            "regularMarketOpen": 0,
                            "fiftyTwoWeekRange": "0",
                            "fiftyTwoWeekLow": 9.03,
                            "fiftyTwoWeekHigh": 15.24,
                            "symbol": "",
                            "summaryProfile": {
                                "address1": "",
                                "address2": "",
                                "city": "",
                                "state": "",
                                "zip": "",
                                "country": "",
                                "phone": "",
                                "website": "",
                                "industry": "",
                                "industryKey": "",
                                "industryDisp": "",
                                "sector": "",
                                "sectorKey": "",
                                "sectorDisp": "",
                                "longBusinessSummary": "",
                                "companyOfficers": [

                                ]
                            }
                        }
                    ]
                }

                return responseReturn
            default:
                console.log(`[ERROR] Erro ao buscar informação da API Brapi`)
                console.error('Erro ao buscar informação da API Brapi:', error.response?.data || error.message);
                throw error;
        }
    }
};

module.exports = apiBrapi;
