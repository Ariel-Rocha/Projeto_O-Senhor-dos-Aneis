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

router.get('/rankingAlturas', (req, res) => {
    usuarioController.listarRanking(req, res);
});
