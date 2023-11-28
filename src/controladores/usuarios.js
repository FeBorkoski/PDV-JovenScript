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

const detalharUsuario = async (req, res) => {
    try {
      const { senha: _, ...usuarioLogado } = req.usuario;
  
      return res.status(200).json(usuarioLogado);
    } catch (error) {
      return res.status(500).json({ erro: "Erro interno do servidor." });
    }
  };

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
    cadastrar,
    detalharUsuario,
  atualizar };
