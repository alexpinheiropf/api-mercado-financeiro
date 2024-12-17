function replacetoLowerCase(param) {
    return param
        .replace(/\+/g, " ") // Substitui '+' por espaço
        .replace(/\s+/g, "-") // Substitui espaços por '-'
        .toLowerCase(); // Converte para letras minúsculas
}

module.exports = replacetoLowerCase;
