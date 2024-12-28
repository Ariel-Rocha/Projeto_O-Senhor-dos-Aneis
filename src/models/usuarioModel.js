var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
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

module.exports = {
    autenticar,
    cadastrar,
    cadastrarAlturas,
    listarAlturas
}; 