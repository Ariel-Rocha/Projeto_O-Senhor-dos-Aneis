
/*
comandos para mysql server
*/
CREATE DATABASE projeto_individual;
USE projeto_individual;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(50) NOT NULL,
    pontuacao INT DEFAULT 0  -- Adicionado para armazenar a pontuação do quiz
);

CREATE TABLE perguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    texto VARCHAR(255) NOT NULL,
    alternativa_a VARCHAR(255) NOT NULL,
    alternativa_b VARCHAR(255) NOT NULL,
    alternativa_c VARCHAR(255) NOT NULL,
    alternativa_d VARCHAR(255) NOT NULL,
    correta CHAR(1) NOT NULL
);

CREATE TABLE respostas_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    pergunta_id INT NOT NULL,
    resposta CHAR(1) NOT NULL,
    correta BOOLEAN NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (pergunta_id) REFERENCES perguntas(id) ON DELETE CASCADE
);

-- Verificando as tabelas
SHOW TABLES;

-- inserindo as perguntas na tabela
INSERT INTO perguntas (texto, alternativa_a, alternativa_b, alternativa_c, alternativa_d, correta)
VALUES
('Quem criou o Um Anel?', 'Sauron', 'Gandalf', 'Frodo', 'Elrond', 'a'),
('Quantos membros compõem a Sociedade do Anel?', '7', '8', '9', '10', 'c'),
('Quem é o portador do Um Anel em grande parte da história?', 'Aragorn', 'Frodo', 'Legolas', 'Sam', 'b'),
('Quem é o verdadeiro herdeiro do trono de Gondor?', 'Boromir', 'Faramir', 'Aragorn', 'Denethor', 'c'),
('Qual o nome do mago branco?', 'Saruman', 'Gandalf', 'Radagast', 'Tom Bombadil', 'b');

SELECT * FROM usuario;

SELECT * FROM perguntas;

SELECT * FROM respostas_usuarios;

SELECT * FROM alturas_usuarios;


-- Usuários que tiveram uma pontuação maior que 50% no quiz
SELECT u.nome, 
       SUM(ru.correta) AS acertos, 
       COUNT(*) AS total_perguntas
FROM usuario u
JOIN respostas_usuarios ru ON u.id = ru.usuario_id
GROUP BY u.id, u.nome
HAVING (SUM(ru.correta) / COUNT(*)) * 100 > 50;

-- Os três melhores usuários no quiz (ranking)
SELECT u.nome, 
       SUM(ru.correta) AS acertos
FROM usuario u
JOIN respostas_usuarios ru ON u.id = ru.usuario_id
GROUP BY u.id, u.nome
ORDER BY acertos DESC
LIMIT 3;


-- Alturas dos usuarios (Maior para menor) Hobbit.
SELECT u.nome, a.altura_hobbits 
FROM alturas_usuarios a
JOIN usuario u ON a.fk_usuario = u.id
ORDER BY a.altura_hobbits DESC;

-- Alturas usuarios (Maior para menor)
SELECT nome, altura 
FROM alturas_usuarios 
ORDER BY altura DESC;

-- query quizModel, obterResultado:
SELECT 
	COUNT(*) AS totalPerguntas, 
	SUM(correta) AS totalAcertos, 
	(SUM(correta) / COUNT(*)) * 100 AS percentual
FROM respostas_usuarios
WHERE usuario_id = ${usuarioId};
        
 -- query quizModel, obterResultados:
 SELECT 
    u.nome,  
    SUM(ru.correta) AS total_acertos,
    COUNT(*) AS total_perguntas,
    (SUM(ru.correta) / COUNT(*)) * 100 AS percentual_acertos
FROM 
    usuario u  
JOIN 
    respostas_usuarios ru  
ON 
    u.id = ru.usuario_id  
GROUP BY 
    u.id, u.nome  
ORDER BY 
    percentual_acertos DESC;
    
    



