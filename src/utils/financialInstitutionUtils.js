function regexBrokers(texto) {
    // Lista de palavras ou padrões a serem removidos
    const palavrasRemover = [
        '\\bS\\.?\\s*A\\.?\\b', // "S.A." com ou sem pontos
        '\\bS\\s*/\\s*A\\b',    // "S/A" com ou sem espaços extras
        '\\bLTDA\\b',           // "LTDA"
        '\\bCORRETORA DE VALORES\\b', // "CORRETORA DE VALORES"
        '\\bCTVM\\b', // "CTVM"
        '\\bCCTVM\\b', // "CCTVM"
        '\\bCVMC\\b' // "CVMC"
    ];

    // Expressão regular para localizar as palavras, independente de maiúsculas/minúsculas
    const regexRemover = new RegExp(palavrasRemover.join('|'), 'gi');

    // Substituir as palavras encontradas por uma string vazia
    texto = texto.replace(regexRemover, '');

    // Remover todos os pontos no texto
    texto = texto.replace(/\./g, '');

    // Remover todos os traços no texto
    texto = texto.replace(/\-/g, '');

    // Remover espaços extras
    return texto.replace(/\s{2,}/g, ' ').trim();
}

module.exports = { regexBrokers };
