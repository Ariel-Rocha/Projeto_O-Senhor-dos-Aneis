var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function cadastrarAlturas(fkusuario, altura, alturaHobbits) { 
    var instrucaoSql = `
        INSERT INTO alturas_usuarios (fk_usuario, altura, altura_hobbits) VALUES (${fkusuario}, ${altura}, ${alturaHobbits});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


 function listarAlturas(){
    var instrucaoSql = `SELECT 
    MAX(altura_hobbits) AS maior, 
    MIN(altura_hobbits) AS menor, 
    AVG(altura_hobbits) AS media
FROM 
    usuario 
JOIN 
    alturas_usuarios 
ON 
    usuario.id = fk_usuario;`

    return database.executar(instrucaoSql);
 }




// Atualizei a model.js em 02/01/2025

 // Abaixo adicionei a função que lista o ranking das alturas dos usuários - model.js atualizada em 02/01/2025
function listarRankingAlturas() {
    // Log para informar que a listagem do ranking está sendo iniciada
    console.log("Listando o ranking das alturas dos usuários");
    
    // Consultei o SQL para buscar os nomes dos usuários e alturas
    // A tabela "usuario" é unida com a tabela "alturas_usuarios" com base no ID do usuário
    // Os resultados são ordenados de forma decrescente pela altura ("altura_hobbits")
    const query = `
        SELECT u.nome, a.altura_hobbits
        FROM usuario u
        JOIN alturas_usuarios a ON u.id = a.fk_usuario
        ORDER BY a.altura_hobbits DESC;
    `;
    
    // Log para exibir a consulta que será executada
    console.log("Executando query: \n" + query);
    
    // Retornei o resultado da execução da consulta no banco de dados
    return database.executar(query);
}

function obterPerguntas() {
    var query = `
        SELECT id, texto, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta
        FROM perguntas;
    `;
    return database.executar(query);
}

function verificarRespostas(respostas) {
    var query = `
        SELECT id, correta
        FROM perguntas;
    `;
    return database.executar(query).then((perguntas) => {
        let acertos = 0;
        for (let i = 0; i < perguntas.length; i++) {
            if (respostas[i] === perguntas[i].correta) {
                acertos++;
            }
        }
        return acertos;
    });
}

function resultadoQuiz(usuarioId) {
    const query = `
        SELECT 
            COUNT(*) AS totalPerguntas,
            SUM(CASE WHEN correta = resposta THEN 1 ELSE 0 END) AS acertos
        FROM respostas_usuarios
        WHERE usuario_id = ${usuarioId};
    `;
    console.log("Executando query para resultado do quiz: \n" + query);
    return database.executar(query);
}

function salvarRespostas(usuarioId, respostas) {
    let query = "INSERT INTO respostas_usuarios (usuario_id, pergunta_id, resposta, correta) VALUES ";
    const valores = respostas.map(r => `(${usuarioId}, ${r.perguntaId}, '${r.resposta}', ${r.correta})`);
    query += valores.join(", ") + ";";

    console.log("Executando query para salvar respostas: \n" + query);
    return database.executar(query);
}


module.exports = {
    autenticar,
    cadastrar,
    cadastrarAlturas,
    listarAlturas,
    listarRankingAlturas,
    obterPerguntas, 
    verificarRespostas,
    resultadoQuiz,
    salvarRespostas,
};