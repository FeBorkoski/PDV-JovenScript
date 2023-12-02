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

const produto = require("./controladores/produtos");

const schemaUsuario = require("./schemas/usuario");
const schemaProduto = require("./schemas/schemaProdutos");

const rotas = express();

rotas.post("/produto", validarCampos(schemaProduto), produto.cadastrarProduto);
rotas.put("/produto/:id", validarCampos(schemaProduto), produto.editarProduto);
rotas.get("/categoria", listarCategorias);
rotas.get("/produto/:id", produto.listarProdutos)

rotas.post("/usuario", validarCampos(schemaUsuario), cadastrar);
rotas.post("/login", verificarCamposLogin, login);
rotas.use(verificarToken);
rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", validarCampos(schemaUsuario), atualizar);

module.exports = rotas;



