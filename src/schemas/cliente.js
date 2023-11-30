const joi = require("joi");

const schema = joi.object({
    nome: joi.string().required().messages({
        'any.required': "O campo nome é obrigatório",
        'string.base': "O campo nome precisa ser do tipo string"
    }),
    email: joi.string().email().required().messages({
        'any.required': "O campo email é obrigatório",
        'string.email': "O campo de email precisa conter um email válido",
        'string.base': "O campo email precisa ser do tipo string"
    }),
    cpf: joi.string().required().min(11).max(11).messages({
        'any.required': "O campo cpf é obrigatório",
        'string.min': "O campo cpf precisa conter 11 caracteres",
        'string.max': "O campo cpf precisa conter 11 caracteres",
        'string.base': "O campo cpf precisa ser do tipo string"
    }),
    cep: joi.string().messages({
        'string.base': "O campo cep precisa ser do tipo string"
    }),
    rua: joi.string().messages({
        'string.base': "O campo rua precisa ser do tipo string"
    }),
    numero: joi.number().messages({
        'number.base': "O campo numero precisa ser do tipo number"
    }),
    bairro: joi.string().messages({
        'string.base': "O campo bairro precisa ser do tipo string"
    }),
    cidade: joi.string().messages({
        'string.base': "O campo cidade precisa ser do tipo string"
    }),
    estado: joi.string().messages({
        'string.base': "O campo estado precisa ser do tipo string"
    })
})

module.exports = schema;