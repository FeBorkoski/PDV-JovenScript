create database dpdv;


create table usuarios ( id serial primary key, nome varchar(1000) not null, email varchar(1000) not null unique, senha varchar(1000) not null);


create table categorias ( id serial primary key, descricao varchar(1000) not null);


INSERT INTO categorias (descricao)
VALUES ('Informática'), ('Celulares'), ('Beleza e Perfumaria'), ('Mercado'), ('Livros e Papelaria'), ('Brinquedos'), ('Moda'), ('Bebê'), ('Games');