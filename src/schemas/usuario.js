const joi = require("joi");

const schema = joi.object({
    nome: joi.string().required().messages({
        'any.required': "O campo nome é obrigatório",
        'string.base': "O campo nome precisa ser do tipo string",
    }),
    email: joi.string().email().required().messages({
        'any.required': "O campo email é obrigatório",
        'string.email': "O campo de email precisa conter um email válido",
        'string.base': "O campo email precisa ser do tipo string"

    }),
    senha: joi.string().required().messages({
        'any.required': "O campo senha é obrigatório",
        'string.base': "O campo senha precisa ser do tipo string"
    }),
})

module.exports = schema;