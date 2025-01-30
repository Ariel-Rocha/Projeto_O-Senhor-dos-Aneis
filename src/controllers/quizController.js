const quizModel = require('../models/quizModel');

function salvarRespostas(req, res) {
    const { usuarioId, respostas } = req.body;

    if (!usuarioId || !respostas || respostas.length === 0) {
        return res.status(400).json({ mensagem: "Dados incompletos." });
    }

    quizModel.salvarRespostas(usuarioId, respostas)
        .then(() => res.status(200).json({ mensagem: "Respostas salvas com sucesso." }))
        .catch((erro) => {
            console.error("Erro ao salvar respostas:", erro);
            res.status(500).json({ mensagem: "Erro ao salvar respostas.", erro });
        });

        console.log("Dados recebidos no backend:", req.body);

}


function resultadoQuiz(req, res) {
    const { usuarioId } = req.params;

    if (!usuarioId) {
        return res.status(400).json({ mensagem: "ID do usuário não fornecido." });
    }

    quizModel.obterResultado(usuarioId)
        .then((resultado) => {
            if (resultado) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({ mensagem: "Nenhum resultado encontrado." });
            }
        })
        .catch((erro) => {
            console.error("Erro ao obter resultado:", erro);
            res.status(500).json({ mensagem: "Erro ao obter resultado.", erro });
        });
}

function obterResultados(req, res) {
    quizModel.obterResultados()
        .then(resultados => {
            res.status(200).json(resultados); // Retorna os resultados como JSON
        })
        .catch(erro => {
            console.error("Erro ao obter resultados:", erro);
            res.status(500).json({ mensagem: "Erro ao obter resultados", erro });
        });
}



module.exports = {
    salvarRespostas,
    resultadoQuiz,
    obterResultados,
};
