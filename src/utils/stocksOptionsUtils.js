function getLastPrice(data) {
    if (!data.prices || data.prices.length === 0) {
        throw new Error("Erro: O derivativo não existe.");
    }

    // Verifica se algum objeto no array 'prices' não tem o campo 'price'
    for (const priceObj of data.prices) {
        if (!priceObj.hasOwnProperty('price')) {
            throw new Error("Erro: O derivativo não existe.");
        }
    }

    // Ordena o array de preços pela data de forma decrescente
    data.prices.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Retorna o preço da primeira entrada após a ordenação
    return data.prices[0].price;
}

module.exports = { getLastPrice };
