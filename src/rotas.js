const express = require("express");
const listarCategorias = require("./controladores/listarCategorias");
const { verificarCamposLogin, validarCampos } = require("./intermediarios/validacao");
const login = require("./controladores/login");
const { verificarToken } = require("./intermediarios/autenticacao");
const { atualizar } = require("./controladores/usuarios");
const schemaUsuario = require("./schemas/usuario");

const rotas = express();

rotas.get("/categoria", listarCategorias);

rotas.post("/login", verificarCamposLogin, login);

rotas.use(verificarToken)
rotas.put("/usuario", validarCampos(schemaUsuario), atualizar);

module.exports = rotas;
