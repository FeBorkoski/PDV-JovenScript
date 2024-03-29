require('dotenv').config()
const { number } = require("joi");
const knex = require("../conexao");
const s3 = require("../servicos/s3.js")

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const produto_imagem = req.file;
  let urlImage;

  try {
    const categoriaExistente = await knex("categorias")
      .where({
        id: categoria_id,
      })
      .first();

    if (!categoriaExistente) {
      return res.status(404).json({ mensagem: "Categoria não existe" });
    }

    if (produto_imagem) {
      let imagemUpload = await s3.upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Body: produto_imagem.buffer,
        Key: `produtos/${produto_imagem.originalname}`,
        ContentType: produto_imagem.mimetype
      }).promise();

      urlImage = imagemUpload.Location;
    }

    const novoProduto = await knex("produtos")
      .insert({
        descricao: descricao.trim(),
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: urlImage
      })
      .returning("*");


    return res.status(201).json(novoProduto[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const editarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;
  const produto_imagem = req.file;
  let urlImage;

  try {
    const produto = await knex("produtos").where({ id }).first();

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    const categoriaExistente = await knex("categorias")
      .where({
        id: categoria_id,
      })
      .first();

    if (!categoriaExistente) {
      return res.status(404).json({ mensagem: "Categoria não existe" });
    }

    if (produto_imagem) {
      let imagemUpload = await s3.upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Body: produto_imagem.buffer,
        Key: `produtos/${produto_imagem.originalname}`,
        ContentType: produto_imagem.mimetype
      }).promise();

      urlImage = imagemUpload.Location;
    }

    const produtoAtualizado = await knex("produtos")
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: urlImage
      })
      .where({ id })
      .returning("*");

    return res.status(201).json(produtoAtualizado[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listarProdutos = async (req, res) => {
  const categoriaId = parseInt(req.query.categoria_id);

  try {
    const produtos = await knex("produtos").select("*");

    if (categoriaId || categoriaId === 0) {
      if (categoriaId > 0 && categoriaId < 10) {
        const produtosFiltrados = produtos.filter((produto) => {
          return produto.categoria_id === categoriaId;
        });
        return res.status(200).json(produtosFiltrados);
      } else {
        return res.status(404).json({ mensagem: "Categoria inexistente." });
      }
    }
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex("produtos").where({ id }).first();

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produtoEmPedido = await knex("pedido_produtos").where(
      { produto_id: id }).first();

    if (produtoEmPedido) {
      return res
        .status(400)
        .json({ mensagem: "Não é possível excluir este produto!" });
    }

    const produto = await knex("produtos").where({ id }).first();

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    await knex("produtos").delete().where({ id });

    if(produto.produto_imagem){
      const index = produto.produto_imagem.indexOf('produtos')
      const path = produto.produto_imagem.slice(index)
  
      await s3.deleteObject({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: path
      }).promise()
    }

    return res.status(204).json();
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  detalharProduto,
  cadastrarProduto,
  editarProduto,
  listarProdutos,
  excluirProduto,
};
