var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/cadastrarAlturas", function (req, res) {
    usuarioController.cadastrarAlturas(req, res);
});
router.get("/listarAlturas", function (req, res){
usuarioController.listarAlturas(req,res);
}) 



// criei uma rota para lidar com requisições GET na URL "/rankingAlturas" - 30-12-2024
router.get('/rankingAlturas', (req, res) => {
    // Chama a função listarRanking do controller de usuários
    // Passa os objetos de requisição (req) e resposta (res) como parâmetros
    usuarioController.listarRanking(req, res);
});

/**
 * Rota para obter perguntas do quiz - 16-01-25
 * Adicionei uma rota GET para buscar todas as perguntas do quiz no banco de dados.
 * Quando essa rota é acessada, chamo a função `obterPerguntas` no `quizController`,
 * que retorna as perguntas junto com as alternativas.
 */
router.get("/quiz/perguntas", function (req, res) {
    quizController.obterPerguntas(req, res);
});

/**
 * Rota para verificar respostas do quiz
 * Aqui configurei uma rota POST para receber as respostas do usuário no quiz.
 * Essa rota chama a função `verificarRespostas` no `quizController`,
 * que compara as respostas enviadas com as corretas no banco de dados.
 */
router.post("/quiz/verificar", function (req, res) {
    quizController.verificarRespostas(req, res);
});

