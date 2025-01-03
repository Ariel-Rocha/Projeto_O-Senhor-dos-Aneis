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
