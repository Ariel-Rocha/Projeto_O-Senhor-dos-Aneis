// Importo a configuração do banco de dados para executar as queries
const database = require("../../src/database/config");
console.log("Database configurado:", database); // Apenas um log para garantir que a conexão foi carregada corretamente.



//29-01
// Função para salvar as respostas do usuário no banco de dados
function salvarRespostas(usuarioId, respostas) {

    // Inicio a query de inserção com a estrutura correta para armazenar múltiplas respostas de uma vez
    var query = "INSERT INTO respostas_usuarios (usuario_id, pergunta_id, resposta, correta) VALUES ";

    // Crio um array para armazenar os valores formatados corretamente antes de inseri-los no banco
    var valores = [];

    // Percorro todas as respostas enviadas pelo usuário
    for (var i = 0; i < respostas.length; i++) {
        var r = respostas[i]; // Pego cada resposta do usuário

        // Adiciono os valores no formato correto para inserção no banco
        valores.push(`(${usuarioId}, ${r.perguntaId}, '${r.resposta}', ${r.correta})`);
    }

    // Juntei todos os valores formatados na query final e adiciono o ";"
    query += valores.join(", ") + ";";
    // Exibo no console a query gerada para verificar se os dados foram formatados corretamente
    console.log("Query gerada para salvar respostas:", query);

    // Executo a query no banco de dados e retorno o resultado
    return database.executar(query);
}

//30-01
// Criei a função para obter o resultado de um único usuário no quiz 
function obterResultado(usuarioId) {
    // Crio a query para contar o total de perguntas e acertos do usuário
    var query = `
        SELECT 
            COUNT(*) AS totalPerguntas, 
            SUM(correta) AS totalAcertos, 
            (SUM(correta) / COUNT(*)) * 100 AS percentual
        FROM respostas_usuarios
        WHERE usuario_id = ${usuarioId};
    `;

    // Exibo a query no console para depuração
    console.log("Query para obter resultado:", query);

    // Executei a query no banco de dados e retorno o resultado
    return database.executar(query).then(function (resultados) {
        // Executo a query no banco de dados e retorno o resultado
        return resultados.length > 0 ? resultados[0] : null;
    });
}

//30-01
// Criei a função para obter o ranking geral dos usuários no quiz (SIMPLIFICADA)
function obterResultados() {
    // Crio a query para calcular o percentual de acertos de todos os usuários e ordená-los do maior para o menor
    var query = `
SELECT 
    u.nome,  
    SUM(ru.correta) AS total_acertos,
    COUNT(*) AS total_perguntas,
    (SUM(ru.correta) / COUNT(*)) * 100 AS percentual_acertos
FROM 
    usuario u  
JOIN 
    respostas_usuarios ru  
ON 
    u.id = ru.usuario_id  
GROUP BY 
    u.id, u.nome  
ORDER BY 
    percentual_acertos DESC;
    `;

    // Exibo no console a query que será executada
    console.log("Executando query para obter resultados gerais:\n", query);
    // Executei a query no banco de dados e retorno os resultados
    return database.executar(query);
}

// Exporto as funções para serem utilizadas em outras partes do código
module.exports = {
    salvarRespostas,
    obterResultado,
    obterResultados,
};
