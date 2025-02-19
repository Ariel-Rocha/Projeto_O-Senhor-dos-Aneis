CREATE DATABASE projeto_ariel;
USE projeto_ariel;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE alturas_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    altura DECIMAL(5, 2) NOT NULL,
    altura_hobbits DECIMAL (5,2) NOT NULL
);

desc alturas_usuarios;


SELECT * FROM alturas_usuarios;

SELECT * FROM usuario join alturas_usuarios ON usuario.id = fk_usuario;


