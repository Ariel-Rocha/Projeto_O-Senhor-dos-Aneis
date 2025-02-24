
-- Primeiro, eu crio o banco de dados para o projeto e já seleciono ele para uso.
CREATE DATABASE projeto_individual;
USE projeto_individual;

-- Agora, vou criar a tabela para armazenar os usuários.
-- tabela usuario
-- Primeiro, eu crio o banco de dados para o projeto e já seleciono ele para uso.
CREATE DATABASE projeto_individual;
USE projeto_individual;

-- Agora, vou criar a tabela para armazenar os usuários.
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Cada usuário terá um ID único que será gerado automaticamente.
    nome VARCHAR(50) NOT NULL, -- Aqui guardo o nome do usuário, e ele é obrigatório.
    email VARCHAR(50) UNIQUE NOT NULL, -- O e-mail do usuário, que deve ser único e obrigatório.
    senha VARCHAR(50) NOT NULL, -- A senha do usuário, também obrigatória.
    pontuacao INT DEFAULT 0 -- Adicionei a pontuação do quiz para armazenar o desempenho do usuário. O valor padrão é 0.
);

-- Agora, crio a tabela que armazena as perguntas do quiz.
CREATE TABLE perguntas (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Cada pergunta terá um ID único gerado automaticamente.
    texto VARCHAR(200) NOT NULL,, -- Aqui fica o texto da pergunta.
    alternativa_a VARCHAR(100) NOT NULL,, -- Alternativa A, obrigatória.
    alternativa_b VARCHAR(100) NOT NULL, -- Alternativa B, obrigatória.
    alternativa_c VARCHAR(100) NOT NULL, -- Alternativa C, obrigatória.
    alternativa_d VARCHAR(100) NOT NULL, -- Alternativa D, obrigatória.
    correta CHAR(1) NOT NULL -- Essa coluna indica qual alternativa é a correta (A, B, C ou D).
);


-- Agora, crio uma tabela para guardar as respostas dos usuários.
CREATE TABLE respostas_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Cada resposta armazenada terá um ID único.
    usuario_id INT NOT NULL, -- O ID do usuário que respondeu a pergunta.
    pergunta_id INT NOT NULL, -- O ID da pergunta respondida.
    resposta CHAR(1) NOT NULL, -- A resposta do usuário (A, B, C ou D).
    correta BOOLEAN NOT NULL, -- Indica se a resposta foi correta (1) ou incorreta (0).
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE, -- Conecto a resposta ao usuário na tabela `usuario`.
    FOREIGN KEY (pergunta_id) REFERENCES perguntas(id) ON DELETE CASCADE -- Conecto a resposta à pergunta na tabela `perguntas`.
    -- Com ON DELETE CASCADE, se um usuário ou pergunta for deletado, as respostas relacionadas também serão apagadas.
);

-- Agora, vou criar uma tabela para armazenar as alturas dos usuários.
CREATE TABLE alturas_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Cada registro de altura terá um ID único gerado automaticamente.
    fk_usuario INT, -- O ID do usuário ao qual essa altura pertence.
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id), -- Conecto a altura ao usuário na tabela `usuario`.
    altura DECIMAL(5, 2) NOT NULL, -- Aqui guardo a altura do usuário em metros (com até 5 dígitos no total e 2 casas decimais).
    altura_hobbits DECIMAL(5, 2) NOT NULL -- Aqui guardo a altura convertida para a escala Hobbit (também com 2 casas decimais).
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
    

-- dados tabela respostas
SELECT * FROM respostas_usuarios LIMIT 5;
--  SELECT para mostrar o ranking do quiz: 
SELECT u.nome,   
    SUM(ru.correta) AS total_acertos, 
    COUNT(*) AS total_perguntas, 
    (SUM(ru.correta) / COUNT(*)) * 100 AS percentual_acertos 
FROM usuario u   
JOIN respostas_usuarios ru ON u.id = ru.usuario_id   
GROUP BY u.id, u.nome   
ORDER BY percentual_acertos DESC;

-- SELECT para o ranking de alturas:
SELECT u.nome, a.altura_hobbits 
FROM usuario u 
JOIN alturas_usuarios a ON u.id = a.fk_usuario 
ORDER BY a.altura_hobbits DESC; 




