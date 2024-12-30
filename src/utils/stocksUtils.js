function extractText(html) {
    // Encontrar o índice da frase "<h2>Características do"
    const limite = "<h2>Características do";
    const indiceFim = html.indexOf(limite);

    // Se o limite for encontrado, pegar apenas a parte inicial
    const textoAteLimite = indiceFim !== -1 ? html.substring(0, indiceFim) : html;

    // Remover todas as tags HTML usando expressão regular
    const textoSemTags = textoAteLimite.replace(/<[^>]*>/g, "");

    // Retornar o texto limpo
    return textoSemTags.trim();
}


module.exports = { extractText };