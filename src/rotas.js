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

const {
  cadastrarProduto,
  editarProduto,
  listarProdutos,
  detalharProduto,
  excluirProduto,
} = require("./controladores/produtos");

const schemaUsuario = require("./schemas/usuario");
const schemaCliente = require("./schemas/cliente");

const { cadastrarCliente, editarCliente } = require("./controladores/clientes");

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
rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProduto);
rotas.delete("/produto/:id", excluirProduto);

rotas.post("/cliente", validarCampos(schemaCliente), cadastrarCliente);
rotas.put("/cliente/:id", validarCampos(schemaCliente), editarCliente);

module.exports = rotas;
