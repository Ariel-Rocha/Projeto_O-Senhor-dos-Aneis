const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Rota para salvar respostas
router.post('/salvarRespostas', quizController.salvarRespostas);

// Rota para obter resultados do quiz
router.get('/resultadoQuiz/:usuarioId', quizController.resultadoQuiz);


router.get('/resultados', quizController.obterResultados);


module.exports = router;
