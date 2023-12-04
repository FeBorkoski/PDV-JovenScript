const knex = require("../conexao");

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const emailFormatado = email.toLowerCase();
        const clienteExiste = await knex("clientes").where({ email: emailFormatado }).orWhere({ cpf }).first();

        if (clienteExiste) {
            return res.status(400).json({ mensagem: "Cliente já cadastrado" });
        }

        const queryCadastro = await knex("clientes").insert({ nome, email: emailFormatado, cpf, cep, rua, numero, bairro, cidade, estado }).returning("*");

        return res.status(201).json(queryCadastro[0]);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    cadastrarCliente
}