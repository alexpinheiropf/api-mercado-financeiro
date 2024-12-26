function getLatestValue(data) {
    // Formata a data para comparação e encontra a mais recente
    const latestEntry = data.reduce((latest, current) => {
        const latestDate = new Date(latest.data.split('/').reverse().join('-'));
        const currentDate = new Date(current.data.split('/').reverse().join('-'));
        return currentDate > latestDate ? current : latest;
    });

    return latestEntry;
}

function firstDayPreviousMonth() {
    const dataAtual = new Date();
    // Define o mês anterior, ajustando para 0-index (janeiro é 0)
    const primeiroDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 1, 1);

    const dia = String(primeiroDia.getDate()).padStart(2, '0'); // Formata o dia com 2 dígitos
    const mes = String(primeiroDia.getMonth() + 1).padStart(2, '0'); // Formata o mês com 2 dígitos
    const ano = primeiroDia.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

module.exports = { getLatestValue, firstDayPreviousMonth };