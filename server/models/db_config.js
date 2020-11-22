require('dotenv').config()

module.exports = {
    host: '127.0.0.1',
    port: '3306',
    user: process.env.DB_ID,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
};