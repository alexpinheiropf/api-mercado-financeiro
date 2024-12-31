const { translateText, capitalize } = require('../utils/globalUtils');

function getCryptoPrice(criptoInfoMarket) {

    // Acessa a chave do primeiro elemento no objeto 'data'
    const firstKey = Object.keys(criptoInfoMarket)[0];

    // Acessa o preço da criptomoeda na primeira posição dentro de 'quote.BRL.price'
    const price = criptoInfoMarket[firstKey].quote.BRL.price;


    return roundValue(price);
}

function roundValue(valor) {
    const fator = Math.pow(10, 2);
    return Math.round(valor * fator) / fator;
}

function getDataCripto(dataCripto) {

    // Buscar a primeira chave dentro de 'data' e acessar o primeiro elemento da lista
    const firstKey = Object.keys(dataCripto.data)[0]; // Pega a primeira chave dentro de 'data'

    // Acessa o primeiro elemento associado a essa chave
    return dataCripto.data[firstKey][0];
}

async function getSegmentCripto(cripto, segment) {
    let category = "";

    // Verificação da palavra "INDUSTRY" em "tag-groups" e extração correspondente de "tag-names"
    const tagGroups = cripto["tag-groups"];
    const tagNames = cripto["tag-names"];
    let industryTags = [];

    if (Array.isArray(tagGroups) && Array.isArray(tagNames)) {
        tagGroups.forEach((group, index) => {
            if (group === "INDUSTRY" && tagNames[index]) {
                industryTags.push(tagNames[index]); // Adiciona apenas o tag-name
            }
        });
    }

    // Formatar o resultado: "category - primeiroValor, restanteDosValores"
    if (industryTags.length > 0 && segment === undefined) {
        category = `${capitalize(cripto.category)} - ${industryTags[0]}`; // Prefixa a categoria no primeiro valor
        if (industryTags.length > 1) {
            category += `, ${industryTags.slice(1).join(", ")}`; // Adiciona os valores restantes
        }
    } else {
        category = capitalize(cripto.category)
    }

    return await translateText(category)
}

module.exports = { getCryptoPrice, getDataCripto, getSegmentCripto };