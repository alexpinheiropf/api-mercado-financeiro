const translateText = require('./translateText');

async function getCriptoInfo(dataCripto) {
    // Verificar se o JSON possui a estrutura esperada
    if (!dataCripto || !dataCripto.data) {
        console.error("JSON inválido ou estrutura inesperada.");
        return null;
    }

    // Buscar a primeira chave dentro de 'data' e acessar o primeiro elemento da lista
    const firstKey = Object.keys(dataCripto.data)[0]; // Pega a primeira chave dentro de 'data'
    const linkData = dataCripto.data[firstKey][0];   // Acessa o primeiro elemento associado a essa chave

    // Extração dos valores principais
    const name = linkData.name;
    const symbol = linkData.symbol;
    const categoryCripto = linkData.category;
    const description = await translateText(linkData.description);

    // Verificação da palavra "INDUSTRY" em "tag-groups" e extração correspondente de "tag-names"
    const tagGroups = linkData["tag-groups"];
    const tagNames = linkData["tag-names"];
    let industryTags = [];

    if (Array.isArray(tagGroups) && Array.isArray(tagNames)) {
        tagGroups.forEach((group, index) => {
            if (group === "INDUSTRY" && tagNames[index]) {
                industryTags.push(tagNames[index]); // Adiciona apenas o tag-name
            }
        });
    }

    // Formatar o resultado: "category - primeiroValor, restanteDosValores"
    let category = "";
    if (industryTags.length > 0) {
        category = `${categoryCripto} - ${industryTags[0]}`; // Prefixa a categoria no primeiro valor
        if (industryTags.length > 1) {
            category += `, ${industryTags.slice(1).join(", ")}`; // Adiciona os valores restantes
        }
    }

    category = await translateText(category)

    // Retornar o resultado
    return {
        id: linkData.id,
        name,
        symbol,
        category,
        description
    };
}

module.exports = getCriptoInfo;
