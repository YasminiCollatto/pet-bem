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
  name varchar(200) not null,
  idade varchar(4) not null,
  tipo varchar(200) not null,
  raca varchar(200) not null,
  peso float(10) not null,
  email varchar(200)
);

ALTER TABLE pets ADD FOREIGN KEY (email) REFERENCES users(email);

SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;

SET @@global.time_zone = '+3:00';