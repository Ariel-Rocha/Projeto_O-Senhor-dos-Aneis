var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

// Rotas de cadastro e autenticação
router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.autenticar(req, res);
});

// Rotas de alturas
router.post("/cadastrarAlturas", function (req, res) {
  usuarioController.cadastrarAlturas(req, res);
});

router.get("/listarAlturas", function (req, res) {
  usuarioController.listarAlturas(req, res);
});

// Rota de ranking
router.get("/rankingAlturas", (req, res) => {
  usuarioController.listarRanking(req, res);
});


/*
// Rotas do quiz (movidas para `usuarioController`)
// router.get("/obterPerguntas", (req, res) => {
//  usuarioController.obterPerguntas(req, res);
//});

// router.post("/verificarRespostas", (req, res) => {
 //  usuarioController.verificarRespostas(req, res);
// });

// router.post("/resultadoQuiz", (req,res)=> {
  usuarioController.resultadoQuiz(req,res);

// }); 

//router.post("/salvarRespostas", (req,res)=> {
 // usuarioController.salvarRespostas(req,res);
//});
*/
// Exporta o router
module.exports = router;
