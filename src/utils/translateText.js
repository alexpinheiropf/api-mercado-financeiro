const { Translate } = require('@google-cloud/translate').v2;

// API do Google Cloud
const translate = new Translate({ key: 'AIzaSyDWJgnc_bsVMGVgxYKCvzTCiNZ79yx482Q' });

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

module.exports = translateText;
