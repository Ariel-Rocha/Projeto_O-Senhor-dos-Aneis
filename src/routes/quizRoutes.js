var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quizController');

// adicionei a rota para salvar respostas
router.post('/salvarRespostas', quizController.salvarRespostas);

// adicionei a rota para obter resultados do quiz
router.get('/resultadoQuiz/:usuarioId', quizController.resultadoQuiz);

// adicionei a rota resultados
router.get('/resultados', quizController.obterResultados);


module.exports = router;
