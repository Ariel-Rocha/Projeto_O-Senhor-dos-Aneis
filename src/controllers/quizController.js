//(31-01)
// Eu estou importando o modelo de dados do quiz para acessar as funções relacionadas ao banco de dados.
const quizModel = require('../models/quizModel');


/* 
    Função: salvarRespostas
    Essa função é responsável por salvar as respostas do quiz enviadas pelo usuário no banco de dados.
*/
function salvarRespostas(req, res) {
    // Eu extraio o ID do usuário e as respostas do corpo da requisição (req.body).
    const { usuarioId, respostas } = req.body;

 // Verifico se o ID do usuário e as respostas foram enviados e se há respostas válidas.
    if (!usuarioId || !respostas || respostas.length === 0) {
// Caso algum dado esteja faltando, envio um status 400 (erro do cliente) com uma mensagem de erro.
        return res.status(400).json({ mensagem: "Dados incompletos." });
    }

     // Chamo a função `salvarRespostas` do modelo para salvar as respostas no banco.
    quizModel.salvarRespostas(usuarioId, respostas)
        .then(() => 
            // Se as respostas forem salvas com sucesso, envio um status 200 com uma mensagem de sucesso.
            res.status(200).json({ mensagem: "Respostas salvas com sucesso." }))
        .catch((erro) => {
            // Então, adicionei caso ocorra um erro ao salvar as respostas, exibo o erro no console.
            console.error("Erro ao salvar respostas:", erro);
            // E envio um status 500 (erro no servidor) com uma mensagem de erro.
            res.status(500).json({ mensagem: "Erro ao salvar respostas.", erro });
        });
    // Log para verificar os dados recebidos no backend.

        console.log("Dados recebidos no backend:", req.body);

}

/* 
    Função: resultadoQuiz
    Essa função busca o resultado de um usuário específico no quiz.
*/
function resultadoQuiz(req, res) {
    // Eu extraio o ID do usuário dos parâmetros da requisição (req.params). - pesquisei em (https://blog.rocketseat.com.br/tipos-de-parametros-nas-requisicoes-rest/) e (https://www.youtube.com/watch?v=kL6FttXvdAU)
    const { usuarioId } = req.params;

     // Verifico se o ID do usuário foi fornecido.
    if (!usuarioId) {
        // Caso o ID não seja fornecido, envio um status 400 com uma mensagem de erro.
        return res.status(400).json({ mensagem: "ID do usuário não fornecido." });
    }

    // Chamo a função `obterResultado` do modelo para buscar o resultado no banco de dados.
    quizModel.obterResultado(usuarioId)
        .then((resultado) => {
            if (resultado) {
               // Se o resultado for encontrado, envio os dados com status 200. 
                res.status(200).json(resultado);
            } else {
                 // Caso o resultado não seja encontrado, envio um status 404 (não encontrado).
                res.status(404).json({ mensagem: "Nenhum resultado encontrado." });
            }
        })
        .catch((erro) => {
            // Se houver um erro ao buscar o resultado, exibo o erro no console.
            console.error("Erro ao obter resultado:", erro);

        // E envio um status 500 com uma mensagem de erro.
            res.status(500).json({ mensagem: "Erro ao obter resultado.", erro });
        });
}

/* 
    Função: obterResultados
    Essa função retorna todos os resultados de quiz cadastrados no banco de dados.
*/
function obterResultados(req, res) {
    // Chamo a função `obterResultados` do modelo para buscar os dados no banco de dados.
    quizModel.obterResultados()
        .then(resultados => {
            // Se os dados forem encontrados, envio um status 200 e retorno os resultados no formato JSON.
            res.status(200).json(resultados); // Retorna os resultados como JSON
        })
        .catch(erro => {
             // Caso ocorra um erro ao buscar os dados, exibo o erro no console.
            console.error("Erro ao obter resultados:", erro);
            // E envio um status 500 com uma mensagem de erro.
            res.status(500).json({ mensagem: "Erro ao obter resultados", erro });
        });
}


/* 
    Por fim, eu exporto as funções para que elas possam ser usadas em outras partes do projeto.
*/

module.exports = {
    salvarRespostas, // Exporto a função responsável por salvar as respostas.
    resultadoQuiz,  // Exporto a função que busca o resultado de um usuário.
    obterResultados, // Exporto a função que busca todos os resultados.
};
