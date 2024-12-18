var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
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

router.get("/rankingAlturas", function (req, res) {
    usuarioController.listarRanking(req, res);
});

module.exports = router;
