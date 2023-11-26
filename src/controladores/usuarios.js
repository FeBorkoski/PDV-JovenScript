const knex = require("../conexao");
const bcrypt = require("bcrypt");

const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCripto = await bcrypt.hash(senha, 10);

    const criaUsuario = await knex("usuarios").select("*").where("email", email);

    if (criaUsuario.length !== 0) {
      return res.status(400).json({ mensagem: "E-mail informado já está cadastrado" });
    }

    const usuario = await knex("usuarios").insert({ nome, email, senha: senhaCripto }).returning("*");
    
    return res.status(201).json(usuario[0]);

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { cadastrar };
