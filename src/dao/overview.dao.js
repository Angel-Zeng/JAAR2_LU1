const mysql = require('mysql2');
const { skibidi } = require('winston');
require ('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    databse: process.env.DB_NAME, 
    port: process.env.DB_PORT
});

module.exports = {
    pool,
};