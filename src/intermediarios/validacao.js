const verificarCamposLogin = async (req, res, next) => {
    const { email, senha } = req.body;

    if (!email) {
        return res.status(400).json({ messagem: "O Email é obrigatório." });
    }
    if (!senha) {
        return res.status(400).json({ messagem: "A senha é obrigatória." });
    }
    next();
};

const validarCampos = schema => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = {
    verificarCamposLogin,
    validarCampos
}