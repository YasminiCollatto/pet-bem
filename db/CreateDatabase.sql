USE PetBem;

CREATE TABLE usuarios
(
    email        varchar(200)                                                  not null primary key,
    is_active    boolean                                                       not null default true,
    created_date datetime                                                      not null default current_timestamp,
    name         varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    password     varchar(200)                                                  not null

);

CREATE TABLE pets
(
    id    INT(10) not null primary key auto_increment,
    nome  varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    idade varchar(4)                                                    not null,
    tipo  varchar(200)                                                  not null,
    raca  INT(10),
    peso  float(10)                                                     not null,
    email varchar(200)
);

CREATE TABLE racas
(
    id        INT(10) PRIMARY KEY auto_increment,
    descricao VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    tipo      CHAR(1)
);

CREATE TABLE diario
(
    id        INT(10) PRIMARY KEY auto_increment,
    descricao VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    data      datetime                                                      not null,
    pet       VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    email     varchar(200)                                                  not null
);

CREATE TABLE consultas
(
    id        INT(10) PRIMARY KEY auto_increment,
    titulo    VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    tipo      VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    data      datetime                                                      not null,
    descricao VARCHAR(250),
    pet       INT(10) not null
);

CREATE TABLE tratamentos
(
    id         INT(10) PRIMARY KEY auto_increment,
    tipo       VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    frequencia VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    descricao  VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    inicio     datetime                                                      not null,
    fim        datetime,
    pet        INT(10) not null
);

CREATE TABLE exames
(
    id        INT(10) PRIMARY KEY auto_increment,
    titulo    VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    tipo      VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    data      datetime                                                      not null,
    descricao VARCHAR(250),
    pet       INT(10) not null
);

CREATE TABLE vacinas
(
    id        INT(10) PRIMARY KEY auto_increment,
    tipo      VARCHAR(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    aplicacao datetime                                                      not null,
    lote      VARCHAR(10)                                                   not null,
    dose      CHAR(1)                                                       not null default "U",
    pet       INT(10) not null
);


ALTER TABLE pets
    ADD FOREIGN KEY (email) REFERENCES usuarios (email);
ALTER TABLE pets
    ADD FOREIGN KEY (raca) REFERENCES racas (id);
ALTER TABLE diario
    ADD FOREIGN KEY (email) REFERENCES usuarios (email);
ALTER TABLE consultas
    ADD FOREIGN KEY (pet) REFERENCES pets (id);
ALTER TABLE tratamentos
    ADD FOREIGN KEY (pet) REFERENCES pets (id);
ALTER TABLE exames
    ADD FOREIGN KEY (pet) REFERENCES pets (id);
ALTER TABLE vacinas
    ADD FOREIGN KEY (pet) REFERENCES pets (id);


-- Definindo as raças de cachorros
INSERT INTO racas (descricao, tipo)
VALUES ('Akita', 'C');
INSERT INTO racas (descricao, tipo)
VALUES ('Beagle', 'C');
INSERT INTO racas (descricao, tipo)
VALUES ('Boxer', 'C');
INSERT INTO racas (descricao, tipo)
VALUES ('Bulldog', 'C');
INSERT INTO racas (descricao, tipo)
VALUES ('Dachshund', 'C');
INSERT INTO racas (descricao, tipo)
VALUES ('Doberman', 'C');
INSERT INTO racas (descricao, tipo)
VALUES ('Golden Retriever', 'C');
INSERT INTO racas (descricao, tipo)
VALUES ('Husky', 'C');

-- Definindo as raças de gatos
INSERT INTO racas (descricao, tipo)
VALUES ('Siamês', 'G');
INSERT INTO racas (descricao, tipo)
VALUES ('Maine Coon', 'G');
INSERT INTO racas (descricao, tipo)
VALUES ('Persa', 'G');
INSERT INTO racas (descricao, tipo)
VALUES ('Ragdoll', 'G');
INSERT INTO racas (descricao, tipo)
VALUES ('Sphynx', 'G');
INSERT INTO racas (descricao, tipo)
VALUES ('Birmanês', 'G');
INSERT INTO racas (descricao, tipo)
VALUES ('Bengal', 'G');
INSERT INTO racas (descricao, tipo)
VALUES ('Burmilla', 'G');
INSERT INTO racas (descricao, tipo)
VALUES ('Egípcio', 'G');
INSERT INTO racas (descricao, tipo)
VALUES ('Britânico', 'G');



SET
character_set_client = utf8;
SET
character_set_connection = utf8;
SET
character_set_results = utf8;
SET
collation_connection = utf8_general_ci;

SET
@@global.time_zone = '+3:00';