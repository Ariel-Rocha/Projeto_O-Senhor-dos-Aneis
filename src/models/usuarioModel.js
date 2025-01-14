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

// Função para buscar as perguntas do quiz no banco de dados
function obterPerguntas() {
    console.log("Buscando as perguntas do quiz.");
    
    const query = `
        SELECT id, texto, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta 
        FROM perguntas;
    `;
    console.log("Executando query: \n" + query);
    return database.executar(query);
}

// Função para verificar as respostas do quiz
function verificarRespostas(respostas) {
    console.log("Verificando as respostas do quiz enviadas pelo usuário.");
    
    const query = `
        SELECT id, correta 
        FROM perguntas;
    `;
    console.log("Executando query: \n" + query);
    return database.executar(query).then((perguntas) => {
        let acertos = 0;
        perguntas.forEach((pergunta, index) => {
            if (respostas[index] === pergunta.correta) {
                acertos++;
            }
        });
        return acertos;
    });
}

// Exporto as funções do modelo para serem usadas em outros módulos
module.exports = {
    autenticar,
    cadastrar,
    cadastrarAlturas,
    listarAlturas,
    listarRankingAlturas,
    obterPerguntas, // Adiciono a função para obter perguntas
    verificarRespostas // Adiciono a função para verificar respostas
};