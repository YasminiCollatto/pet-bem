USE PetBem;

CREATE TABLE user (
    email varchar(200) not null primary key,
    is_active boolean not null default true,
    created_date datetime not null default current_timestamp,
    name varchar(200) not null,
    password varchar(200) not null

);

CREATE TABLE animais (
                      id integer not null primary key auto_increment,
                      name varchar(200) not null

);
SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;

SET @@global.time_zone = '+3:00';