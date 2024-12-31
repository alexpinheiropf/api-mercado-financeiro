const { Translate } = require('@google-cloud/translate').v2;

// API do Google Cloud
const translate = new Translate({ key: 'AIzaSyDWJgnc_bsVMGVgxYKCvzTCiNZ79yx482Q' });

function replacetoLowerCase(param) {
    return param
        .replace(/\+/g, " ") // Substitui '+' por espaço
        .replace(/\s+/g, "-") // Substitui espaços por '-'
        .toLowerCase(); // Converte para letras minúsculas
}

// Função para traduzir texto
async function translateText(text) {
    try {
        // Traduzindo o texto
        const [returnTranslate] = await translate.translate(text, 'pt');

        return returnTranslate

    } catch (erro) {
        console.error('Erro na tradução:', erro);
    }
}

function formattedCNPJ(cnpj) {
    // Converte a entrada para string, caso não seja
    cnpj = String(cnpj);

    // Remove qualquer caractere não numérico
    cnpj = cnpj.replace(/\D/g, '');

    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length !== 14) {
        return cnpj
    }

    // Formata o CNPJ
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

function capitalize(word) {
    if (!word) return ''; // Verifica se a palavra é válida
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

module.exports = { replacetoLowerCase, translateText, formattedCNPJ, capitalize };
