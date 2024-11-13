// config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST, // Host
    dialect: 'mysql', // Tipo de base de datos
    port: process.env.DB_PORT, // Puerto
    logging: false, // Desactiva el log de SQL en la consola
  }
);

module.exports = sequelize;
