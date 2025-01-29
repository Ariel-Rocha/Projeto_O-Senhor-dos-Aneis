const database = require("../../src/database/config");
console.log("Database configurado:", database);

function salvarRespostas(usuarioId, respostas) {
    // Mapear as respostas e adicionar lógica para verificar se estão corretas
    let valores = respostas.map((resposta) => {
        return `( 
            ${usuarioId}, 
            ${resposta.perguntaId}, 
            '${resposta.resposta}', 
            (SELECT IF('${resposta.resposta}' = correta, 1, 0) FROM perguntas WHERE id = ${resposta.perguntaId})
        )`;
    }).join(", ");

    const query = `
        INSERT INTO respostas_usuarios (usuario_id, pergunta_id, resposta, correta) 
        VALUES ${valores};
    `;
    respostas.forEach((resposta) => {
        console.log("Resposta processada:", resposta);
    });
    
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
