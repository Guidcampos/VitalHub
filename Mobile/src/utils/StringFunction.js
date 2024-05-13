export const dateFormatDbToView = data => {

    data = data.substr(0, 10);//retorna apenas a data[2023-11-10]
    data = data.split("-") //retorna um array [2023, 11, 10]


    return `${data[2]}/${data[1]}/${data[0]}`;
}
export const invertDate = (dateStr) => {
    const parts = dateStr.split('/');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export const formatDate = (text) => {
    let formattedDate = text.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Adiciona barras após o dia e o mês
    if (formattedDate.length > 2) {
        formattedDate = formattedDate.replace(/(\d{2})(\d)/, '$1/$2');
    }
    // Adiciona barras após o mês e o ano
    if (formattedDate.length > 5) {
        formattedDate = formattedDate.replace(/(\d{2})(\d)/, '$1/$2');
    }

    return formattedDate;
};
export const functionPrioridade = prioridade => {
    return prioridade === 1 ? 'Rotina' : prioridade === 2 ? 'Exame' : 'Urgencia'
}