// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Endpoints de la API v1
router.get('/servicios', apiController.obtenerServicios);
router.get('/servicios/:id', apiController.obtenerServicioPorId);
router.post('/servicios', apiController.crearServicio);
router.put('/servicios/:id', apiController.actualizarServicio);
router.delete('/servicios/:id', apiController.eliminarServicio);

module.exports = router;
