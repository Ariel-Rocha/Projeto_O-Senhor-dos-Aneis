const database = require("../../src/database/config");
console.log("Database configurado:", database);

function salvarRespostas(usuarioId, respostas) {
    let query = "INSERT INTO respostas_usuarios (usuario_id, pergunta_id, resposta, correta) VALUES ";
    const valores = respostas.map(r => `(${usuarioId}, ${r.perguntaId}, '${r.resposta}', ${r.correta})`);
  // const valores = respostas.map(r => `(${usuarioId}, ${r.perguntaId}, '${r.resposta}', ${0})`);
    query += valores.join(", ") + ";";

    console.log("Query gerada para salvar respostas:", query); 
    return database.executar(query);
}

function obterResultado(usuarioId) {
    const query = `
        SELECT 
            COUNT(*) AS totalPerguntas,
            SUM(correta) AS totalAcertos,
            (SUM(correta) / COUNT(*)) * 100 AS percentual
        FROM respostas_usuarios
        WHERE usuario_id = ${usuarioId};
    `;

    console.log("Query para obter resultado:", query);

    return database.executar(query).then((resultados) => {
        if (resultados.length > 0) {
            return resultados[0];
        } else {
            return null;
        }
    });
}

module.exports = {
    salvarRespostas,
    obterResultado
};
