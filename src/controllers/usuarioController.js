var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                            res.json({ 
                                id: resultadoAutenticar[0].id, 
                                email:resultadoAutenticar[0].email,
                                nome: resultadoAutenticar[0].nome,
                                senha: resultadoAutenticar[0].senha
                            })
                        // aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                        //     .then((resultadoAquarios) => {
                        //         if (resultadoAquarios.length > 0) {
                        //             res.json({
                        //                 id: resultadoAutenticar[0].id,
                        //                 email: resultadoAutenticar[0].email,
                        //                 nome: resultadoAutenticar[0].nome,
                        //                 senha: resultadoAutenticar[0].senha,
                        //                 aquarios: resultadoAquarios
                        //             });
                        //         } else {
                        //             res.status(204).json({ aquarios: [] });
                        //         }
                        //     })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function cadastrarAlturas(req, res) {
var fkusuario = req.body.fkusuario
var altura_usuario = req.body.altura_usuario
var altura_hobbits = req.body.altura_hobbit
usuarioModel.cadastrarAlturas(fkusuario,altura_usuario, altura_hobbits).then(function (resultado){
    res.json(resultado)
}).catch(function (erro){
    console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
    res.status(500).json(erro.sqlMessage)
})
}
function listarAlturas(req,res){
    usuarioModel.listarAlturas(req,res).then((resultado =>{
        res.status(200).json(resultado)
    }))
}


// 01-01-2025
// criei a função para listar o ranking de alturas
function listarRanking(req, res) {
    // Chama a função listarRankingAlturas do usuarioModel para buscar os dados no banco de dados
    usuarioModel.listarRankingAlturas()
        .then((resultado) => {
            // Se a consulta for bem-sucedida, retorna os resultados com o status HTTP 200 (OK)
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            // Em caso de erro, exibe o erro no console com uma mensagem
            console.log("Houve um erro ao buscar o ranking:", erro.sqlMessage);
            // Retorna o erro com o status HTTP 500 (Erro interno do servidor)
            res.status(500).json(erro.sqlMessage);
        });
}

// Exporta as funções do controlador para serem usadas em outros módulos
module.exports = {
    autenticar,        // Função para autenticar usuários
    cadastrar,         // Função para cadastrar novos usuários
    cadastrarAlturas,  // Função para cadastrar as alturas dos usuários
    listarAlturas,     // Função para listar as alturas cadastradas
    listarRanking,     // Função recém-adicionada para listar o ranking de alturas
};