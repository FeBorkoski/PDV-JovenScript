const joi = require("joi");

const schema = joi.object({
    nome: joi.string().required().messages({
        'any.required': "O campo nome é obrigatório"
    }),
    email: joi.string().email().required().messages({
        'any.required': "O campo email é obrigatório",
        'string.email': "O campo de email precisa conter um email válido"
    }),
    senha: joi.string().required().messages({
        'any.required': "O campo senha é obrigatório"
    }),
})

module.exports = schema;