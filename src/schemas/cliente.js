const joi = require("joi");

const schema = joi.object({
    nome: joi.string().required().messages({
        'any.required': "O campo nome é obrigatório"
    }),
    email: joi.string().email().required().messages({
        'any.required': "O campo email é obrigatório",
        'string.email': "O campo de email precisa conter um email válido"
    }),
    cpf: joi.string().required().min(11).max(11).messages({
        'any.required': "O campo cpf é obrigatório",
        'string.min': "O campo cpf precisa conter 11 caracteres",
        'string.max': "O campo cpf precisa conter 11 caracteres"
    }),
    cep: joi.string(),
    rua: joi.string(),
    numero: joi.number(),
    bairro: joi.string(),
    cidade: joi.string(),
    estado: joi.string()
})

module.exports = schema;