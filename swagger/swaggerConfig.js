const swaggerJsdoc = require('swagger-jsdoc');

// Configuración de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentación - Airlink Solutions',
    version: '1.0.0',
    description: 'Documentación de la API de Servicios',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
    {
      url: 'https://airlink-solutions-services.onrender.com',
      description: 'Servidor de producción',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./controllers/apiController.js'], // Archivos donde están los endpoints documentados
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
