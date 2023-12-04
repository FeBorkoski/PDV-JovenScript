require('dotenv').config()

const knex = require('knex')({
    client: 'pg',
    connection: {
<<<<<<< HEAD
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
=======
        host:"localhost",
        port: 5432,
        user: "postgres",
        password: "123",
        database: "pdv"
>>>>>>> e8698acf4a0d9f1639b2f2f4a40f40450fdad296
    }
});

module.exports = knex;