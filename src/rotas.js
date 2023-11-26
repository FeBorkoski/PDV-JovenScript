const express = require("express");
const listarCategorias = require("./controladores/listarCategorias");
const { cadastrar } = require("./controladores/usuarios");


const rotas = express();

rotas.get("/categoria", listarCategorias);
rotas.post("/usuario", cadastrar)


module.exports = rotas;