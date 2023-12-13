const knex = require("../conexao");

const listarPedidos = async (req, res) => {
  try {
    const { cliente_id } = req.query;

    let query = knex.select(
      'pedidos.id as pedido_id',
      'pedidos.valor_total',
      'pedidos.observacao',
      'pedidos.cliente_id',
      'clientes.nome as cliente_nome'
    )
    .from('pedidos')
    .join('clientes', 'clientes.id', '=', 'pedidos.cliente_id');

    if (cliente_id) {
      const clienteExiste = await knex("clientes")
        .where({ id: cliente_id })
        .first();

      if (!clienteExiste) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" });
      }

      query = query.where('pedidos.cliente_id', cliente_id);
    }

    const pedidos = await query;

    const resultados = [];

    for (const pedido of pedidos) {
      const pedidoProdutos = await knex
        .select(
          'pedido_produtos.id',
          'pedido_produtos.quantidade_produto',
          'pedido_produtos.valor_produto',
          'pedido_produtos.pedido_id',
          'pedido_produtos.produto_id',
          'produtos.descricao as produto_descricao'
        )
        .from('pedido_produtos')
        .join('produtos', 'produtos.id', '=', 'pedido_produtos.produto_id')
        .where('pedido_produtos.pedido_id', pedido.pedido_id);

      const resultadoPedido = {
        pedido: {
          id: pedido.pedido_id,
          valor_total: pedido.valor_total,
          observacao: pedido.observacao,
          cliente_id: pedido.cliente_id,
          cliente_nome: pedido.cliente_nome,
        },
        pedido_produtos: pedidoProdutos.map(produto => ({
          id: produto.id,
          quantidade_produto: produto.quantidade_produto,
          valor_produto: produto.valor_produto,
          pedido_id: produto.pedido_id,
          produto_id: produto.produto_id,
          produto_descricao: produto.produto_descricao,
        })),
      };

      resultados.push(resultadoPedido);
    }

    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro interno do servidor", error: error.message });
  }
};

module.exports = listarPedidos;
