create database pdv;


create table usuarios (id serial primary key, nome varchar(1000) not null, email varchar(1000) not null unique, senha varchar(1000) not null);


create table categorias (id serial primary key, descricao varchar(1000) not null);


INSERT INTO categorias (descricao)
VALUES ('Informática'), ('Celulares'), ('Beleza e Perfumaria'), ('Mercado'), ('Livros e Papelaria'), ('Brinquedos'), ('Moda'), ('Bebê'), ('Games');

CREATE TABLE produtos (
  id serial primary key,
  descricao text not null unique,
  quantidade_estoque integer not null,
  valor integer not null,
  categoria_id integer references categorias(id)
);

create table clientes (
  id serial primary key,
  nome text not null,
  email text not null unique,
  cpf varchar(11) unique, 
  cep varchar(8), 
  rua text,
  numero text,
  bairro text,
  cidade text,
  estado varchar(2)

);