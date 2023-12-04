const knex = require("../conexao");

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const categoriaExistente = await knex("categorias")
      .where({
        id: categoria_id,
      })
      .first();

    if (!categoriaExistente) {
      return res.status(404).json({ mensagem: "Categoria não existe" });
    }

    const novoProduto = await knex("produtos")
      .insert({
        descricao: descricao.trim(),
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");

    return res.status(201).json({ "Produto criado": novoProduto[0] });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const editarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { id } = req.params;
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

    const produtoAtualizado = await knex("produtos")
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .where({ id })
      .returning("*");

    return res.status(201).json({ "Produto atualizado": produtoAtualizado[0] });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }

};

const listarProdutos = async (req, res) => {
  try {
    if (req.params.categoria_id) { 
      const categoriaId = parseInt(req.params.categoria_id);

      const categoriaExistente = await knex('categorias').where({ id: categoriaId }).first();

      if (categoriaExistente) {
        const produtosFiltrados = await knex('produtos').where({ categoria_id: categoriaId });
        return res.json(produtosFiltrados);
      } else {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }
    } else {
      const produtos = await knex('produtos');
      return res.json(produtos);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};


module.exports = {
  cadastrarProduto,
  editarProduto,
  listarProdutos,
};
