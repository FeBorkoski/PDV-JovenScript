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

const { cadastrarProduto, editarProduto } = require("./controladores/produtos");

const schemaUsuario = require("./schemas/usuario");
const schemaProduto = require("./schemas/schemaProdutos");

const rotas = express();

rotas.get("/categoria", listarCategorias);

rotas.post("/usuario", validarCampos(schemaUsuario), cadastrar);
rotas.post("/login", verificarCamposLogin, login);

rotas.use(verificarToken);
rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", validarCampos(schemaUsuario), atualizar);
rotas.post("/produto", validarCampos(schemaProduto), cadastrarProduto);
rotas.put("/produto/:id", validarCampos(schemaProduto), editarProduto);

module.exports = rotas;
