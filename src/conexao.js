require('dotenv').config()


const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: '3430',
        database: 'pdv'
    }
});

module.exports = knex