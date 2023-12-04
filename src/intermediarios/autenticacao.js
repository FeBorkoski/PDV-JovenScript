require("dotenv").config();
const knex = require("../conexao");
const jwt = require("jsonwebtoken");
const senha_jwt = process.env.SENHA_JWT

const verificarToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ messagem: "Precisa de autorização." });
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.decode(token, senha_jwt);

    const user = await knex("usuarios")
      .select(["id", "nome", "email"])
      .where({ id })
      .first();

    if (!user || user.length === 0) {
      return res.status(401).json({ messagem: "Precisa de autorização." });
    }

    req.usuario = user;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno" });
  }
};

module.exports = {
  verificarToken,
};