const express = require("express");
const listarCategorias = require("./controladores/listarCategorias");
const { verificarCamposLogin } = require("./intermediarios/validacao");
const login = require("./controladores/login");
const { verificarToken } = require("./intermediarios/autenticacao");

const rotas = express();

rotas.get("/categoria", listarCategorias);

rotas.post("/login", verificarCamposLogin, login);

rotas.use(verificarToken)

module.exports = rotas;
