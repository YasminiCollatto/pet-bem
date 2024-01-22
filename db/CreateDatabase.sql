USE PetBem;

CREATE TABLE users (
    email varchar(200) not null primary key,
    is_active boolean not null default true,
    created_date datetime not null default current_timestamp,
    name varchar(200) not null,
    password varchar(200) not null

);

CREATE TABLE pets (
  id integer not null primary key auto_increment,
  nome varchar(200) not null,
  idade varchar(4) not null,
  tipo varchar(200) not null,
  raca varchar(200) not null,
  peso float(10) not null,
  email varchar(200)
);

ALTER TABLE pets ADD FOREIGN KEY (email) REFERENCES users(email);

CREATE TABLE racas (
                         id INT PRIMARY KEY auto_increment,
                         descricao VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                         tipo CHAR(1)
);

-- Definindo os tipos de animais (cachorro e gato)
INSERT INTO racas (id, descricao, tipo) VALUES (1, 'Cachorro', 'C');
INSERT INTO racas (id, descricao, tipo) VALUES (2, 'Gato', 'G');

-- Definindo as raças de cachorros
INSERT INTO racas (id, descricao, tipo) VALUES (3, 'Akita', 'C');
INSERT INTO racas (id, descricao, tipo) VALUES (4, 'Beagle', 'C');
INSERT INTO racas (id, descricao, tipo) VALUES (5, 'Boxer', 'C');
INSERT INTO racas (id, descricao, tipo) VALUES (6, 'Bulldog', 'C');
INSERT INTO racas (id, descricao, tipo) VALUES (7, 'Dachshund', 'C');
INSERT INTO racas (id, descricao, tipo) VALUES (8, 'Doberman', 'C');
INSERT INTO racas (id, descricao, tipo) VALUES (9, 'Golden Retriever', 'C');
INSERT INTO racas (id, descricao, tipo) VALUES (10, 'Husky', 'C');

-- Definindo as raças de gatos
INSERT INTO racas (id, descricao, tipo) VALUES (11, 'Siamês', 'G');
INSERT INTO racas (id, descricao, tipo) VALUES (12, 'Maine Coon', 'G');
INSERT INTO racas (id, descricao, tipo) VALUES (13, 'Persa', 'G');
INSERT INTO racas (id, descricao, tipo) VALUES (14, 'Ragdoll', 'G');
INSERT INTO racas (id, descricao, tipo) VALUES (15, 'Sphynx', 'G');
INSERT INTO racas (id, descricao, tipo) VALUES (16, 'Birmanês', 'G');
INSERT INTO racas (id, descricao, tipo) VALUES (17, 'Bengal', 'G');
INSERT INTO racas (id, descricao, tipo) VALUES (18, 'Burmilla', 'G');
INSERT INTO racas (id, descricao, tipo) VALUES (19, 'Egípcio', 'G');
INSERT INTO racas (id, descricao, tipo) VALUES (20, 'Britânico', 'G');



SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;

SET @@global.time_zone = '+3:00';