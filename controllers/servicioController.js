// controllers/servicioController.js
const Servicio = require('../models/Servicio');

// Listar todos los servicios
exports.listarServicios = async (req, res) => {
  try {
    const servicios = await Servicio.findAll();
    res.render('servicios/index', { title: 'Lista de Servicios', servicios });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Mostrar formulario para crear un nuevo servicio
exports.mostrarFormularioCrear = (req, res) => {
  res.render('servicios/nuevo', { title: 'Agregar Nuevo Servicio' });
};

// Crear un nuevo servicio
exports.crearServicio = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    await Servicio.create({ nombre, descripcion });
    res.redirect('/servicios');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Mostrar formulario para editar un servicio
exports.mostrarFormularioEditar = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    res.render('servicios/editar', { title: 'Editar Servicio', servicio });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un servicio
exports.actualizarServicio = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    await Servicio.update(
      { nombre, descripcion },
      { where: { id: req.params.id } }
    );
    res.redirect('/servicios');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar un servicio
exports.eliminarServicio = async (req, res) => {
  try {
    await Servicio.destroy({ where: { id: req.params.id } });
    res.redirect('/servicios');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Ver detalle de un servicio
exports.verServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    res.render('servicios/ver', { title: 'Detalle del Servicio', servicio });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
