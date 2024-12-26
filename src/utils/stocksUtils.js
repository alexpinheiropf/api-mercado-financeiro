function formattedCNPJ(cnpj) {
    // Converte a entrada para string, caso não seja
    cnpj = String(cnpj);

    // Remove qualquer caractere não numérico
    cnpj = cnpj.replace(/\D/g, '');

    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) {
        throw new Error('CNPJ inválido. Certifique-se de que ele tenha 14 dígitos.');
    }

    // Formata o CNPJ
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

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


module.exports = { formattedCNPJ, extractText };