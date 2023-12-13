const express = require("express");
const listarCategorias = require("./controladores/listarCategorias");
const listarPedidos = require("./controladores/listarPedidos")
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

const {
  cadastrarCliente,
  editarCliente,
  listarClientes,
  detalharCliente,
} = require("./controladores/clientes");

const cadastrarPedido = require("./controladores/cadastrarPedido");

const schemaUsuario = require("./schemas/usuario");
const schemaCliente = require("./schemas/cliente");
const schemaProduto = require("./schemas/schemaProdutos");
const schemaPedidos = require("./schemas/schemaPedidos");

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
rotas.get("/cliente", listarClientes);
rotas.get("/cliente/:id", detalharCliente);

rotas.post("/pedido", validarCampos(schemaPedidos), cadastrarPedido);
rotas.get("/pedido/:id?", listarPedidos);

module.exports = rotas;
