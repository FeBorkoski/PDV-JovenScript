create database pdv;

create table usuarios (
    id serial primary key,
    nome varchar(1000) not null,
    email varchar(1000) not null unique,
    senha varchar(1000) not null
);

create table categorias (
    id serial primary key,
    descricao varchar(1000) not null
);

INSERT INTO "categorias" (id,descricao) VALUES (1,'Informatica'),(2, 'Celulares'),(3, 'Beleza e perfumaria'),(4, 'Mercado');
INSERT INTO "categorias" (id,descricao) VALUES (5,'Livros e Papelaria'),(6,'Brinquedos'),(7,'Moda'),(8,'Bebê'),(9,'Games');