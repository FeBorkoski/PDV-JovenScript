const knex = require("../conexao");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  const emailFormatado = email.toLowerCase();

  try {
    const clienteExiste = await knex("clientes")
      .where({ email: emailFormatado })
      .orWhere({ cpf })
      .first();

    if (clienteExiste) {
      return res.status(400).json({ mensagem: "Cliente já cadastrado" });
    }

    const queryCadastro = await knex("clientes")
      .insert({
        nome,
        email: emailFormatado,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
      })
      .returning("*");

    return res.status(201).json(queryCadastro[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const editarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  const emailFormatado = email.toLowerCase();

  try {
    const clienteCadastrado = await knex("clientes").where({ id }).first();

    if (!clienteCadastrado) {
      return res.status(404).json({ mensagem: "Cliente não cadastrado." });
    }

    const cadastroExistente = await knex("clientes")
      .where(function () {
        this.where({ email }).orWhere({ cpf });
      })
      .andWhere("id", "!=", id)
      .first();

    if (cadastroExistente) {
      return res
        .status(400)
        .json({ mensagem: "E-mail e/ou cpf já cadastrados" });
    }

    await knex("clientes")
      .update({
        nome,
        email: emailFormatado,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
      })
      .where({ id });

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const listarClientes = async (_req, res) => {
  try {
    const clientes = await knex("clientes");
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await knex("clientes").where({ id }).first();

    if (!cliente) {
      return res
        .status(404)
        .json({ mensagem: "Nenhum cliente cadastrado com o ID informado." });
    }

    return res.status(200).json(cliente);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarCliente,
  editarCliente,
  listarClientes,
  detalharCliente,
};
