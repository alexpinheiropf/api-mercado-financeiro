function getCryptoPrice(criptoInfoMarket) {
    // Acessa a chave do primeiro elemento no objeto 'data'
    const firstKey = Object.keys(criptoInfoMarket.data)[0];

    // Acessa o preço da criptomoeda na primeira posição dentro de 'quote.BRL.price'
    const price = criptoInfoMarket.data[firstKey].quote.BRL.price;

    return price;
}

module.exports = getCryptoPrice;