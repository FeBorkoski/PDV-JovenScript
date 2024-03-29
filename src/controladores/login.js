require('dotenv').config()
const knex = require('../conexao')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senha_jwt = `{process.env.SENHA_JWT}`

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await knex("usuarios").select("*").where({ email }).first();

    if (!user || user.length === 0) {
      return res.status(404).json({ messagem: "Email e/ou senha invalido." });
    }

    const verificarSenha = await bcrypt.compare(senha, user.senha);

    if (!verificarSenha) {
      return res.status(400).json({ messagem: "Email e/ou senha invalido." });
    }

    const token = jwt.sign({ id: user.id }, senha_jwt, {
      expiresIn: "2h",
    });

    const { senha: _, ...usuario } = user;

    return res.status(200).json({ usuario, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = login;