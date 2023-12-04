const express = require("express");
const listarCategorias = require("./controladores/listarCategorias");
const {
  cadastrar,
  detalharUsuario,
  atualizar,
} = require("./controladores/usuarios");
const {
  verificarCamposLogin,
  validarCampos,
} = require("./intermediarios/validacao");
const login = require("./controladores/login");
const { verificarToken } = require("./intermediarios/autenticacao");
const schemaUsuario = require("./schemas/usuario");
const schemaCliente = require("./schemas/cliente");

const { cadastrarCliente, editarCliente } = require("./controladores/clientes");


const rotas = express();

rotas.get("/categoria", listarCategorias);
rotas.post("/usuario", validarCampos(schemaUsuario), cadastrar);
rotas.post("/login", verificarCamposLogin, login);

rotas.use(verificarToken);
rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", validarCampos(schemaUsuario), atualizar);

rotas.post("/cliente", validarCampos(schemaCliente), cadastrarCliente);
rotas.put("/cliente/:id", validarCampos(schemaCliente), editarCliente);

module.exports = rotas;
