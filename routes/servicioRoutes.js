// routes/servicioRoutes.js
const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

// Rutas protegidas para el CRUD de servicios
router.get('/servicios', ensureAuthenticated, servicioController.listarServicios); // Listar servicios
router.get('/servicios/nuevo', ensureAuthenticated, servicioController.mostrarFormularioCrear); // Formulario para crear un servicio
router.post('/servicios', ensureAuthenticated, servicioController.crearServicio); // Crear un servicio
router.get('/servicios/editar/:id', ensureAuthenticated, servicioController.mostrarFormularioEditar); // Formulario para editar un servicio
router.post('/servicios/editar/:id', ensureAuthenticated, servicioController.actualizarServicio); // Actualizar un servicio
router.post('/servicios/eliminar/:id', ensureAuthenticated, servicioController.eliminarServicio); // Eliminar un servicio
router.get('/servicios/:id', ensureAuthenticated, servicioController.verServicio); // Ver detalles de un servicio

module.exports = router;

