const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger/swaggerConfig'); // Importa tu configuración de Swagger
const { ensureAuthenticated } = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

const router = express.Router();

// Configura la documentación de Swagger en esta ruta
router.use('/',ensureAuthenticated, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
