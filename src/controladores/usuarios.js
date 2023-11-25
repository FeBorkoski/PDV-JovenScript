const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const detalharUsuario = async (req, res) => {
  try {
    const { senha: _, ...usuarioLogado } = req.user;

    return res.status(200).json(usuarioLogado);
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor." });
  }
};

module.exports = {
  detalharUsuario,
};
