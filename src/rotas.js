const express = require("express");
const listarCategorias = require("./controladores/listarCategorias");


const rotas = express();

rotas.get("/categoria", listarCategorias);


module.exports = rotas;