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

select * from perguntas;
SELECT * FROM usuario;

INSERT INTO usuario (nome, email, senha) VALUES ('Teste', 'teste@teste.com', '123456');

SELECT * FROM respostas_usuarios;

SELECT IF('d' = correta, 1, 0) AS correta FROM perguntas WHERE id = 2;

SELECT id, texto, correta FROM perguntas;

SELECT IF('a' = correta, 1, 0) AS correta FROM perguntas WHERE id = 1;
SELECT * FROM respostas_usuarios;
