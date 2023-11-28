const knex = require("../conexao");
const bcrypt = require("bcrypt");

const atualizar = async (req, res) => {
    const { usuario } = req;
    const { nome, email, senha } = req.body;

    try {
        const emailExistente = await knex("usuarios").where({ email })
            .andWhere('id', '!=', usuario.id).first();

        if (emailExistente) return res.status(400).json({ mensagem: "E-mail informado já está cadastrado" })

        const senhaCripto = await bcrypt.hash(senha, 10);


        await knex("usuarios").where({ id: usuario.id }).update({
            nome,
            email,
            senha: senhaCripto
        });

        return res.status(204).json();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

module.exports = {
    atualizar
}