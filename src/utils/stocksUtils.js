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

module.exports = { formattedCNPJ };
