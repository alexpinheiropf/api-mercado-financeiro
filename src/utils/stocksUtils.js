function getType(jsonData, stockSymbol) {
    const stock = jsonData.stocks.find(stock => stock.stock.toLowerCase() === stockSymbol.toLowerCase());

    return stock ? validType(stock.type) : '' // Retorna 'type' ou null se não encontrar
}

function validType(tipo) {
    switch (tipo.toLowerCase()) {
        case 'stock':
            return 'Ação';
        case 'bdr':
            return 'BDR';
        default:
            throw new Error('Tipo de investimento inválido. Busque por Ações Brasileiras ou BDR.');
    }
}

function formattedCNPJ(cnpj) {
    // Verificando se o CNPJ existe
    if (!cnpj) {
        return '';
    }

    // Aplicando a máscara no CNPJ
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

module.exports = { getType, formattedCNPJ };
