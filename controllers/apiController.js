// controllers/apiController.js
const Servicio = require('../models/Servicio');

// Obtener todos los servicios
exports.obtenerServicios = async (req, res) => {
  try {
    const servicios = await Servicio.findAll();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un servicio por ID
exports.obtenerServicioPorId = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (servicio) {
      res.json(servicio);
    } else {
      res.status(404).json({ error: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo servicio
exports.crearServicio = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevoServicio = await Servicio.create({ nombre, descripcion });
    res.status(201).json(nuevoServicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un servicio
exports.actualizarServicio = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const [updated] = await Servicio.update(
      { nombre, descripcion },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const servicioActualizado = await Servicio.findByPk(req.params.id);
      res.status(200).json(servicioActualizado);
    } else {
      res.status(404).json({ error: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un servicio
exports.eliminarServicio = async (req, res) => {
  try {
    const deleted = await Servicio.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Servicio eliminado' });
    } else {
      res.status(404).json({ error: 'Servicio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
