const Servicio = require('../models/Servicio');

/**
 * @swagger
 * components:
 *   schemas:
 *     Servicio:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del servicio
 *         nombre:
 *           type: string
 *           description: Nombre del servicio
 *         descripcion:
 *           type: string
 *           description: Descripción del servicio
 *       example:
 *         id: 1
 *         nombre: Servicio de Limpieza
 *         descripcion: Servicio para limpieza de oficinas
 */

/**
 * @swagger
 * /api/v1/servicios:
 *   get:
 *     summary: Obtener todos los servicios
 *     tags: [Servicios]
 *     responses:
 *       200:
 *         description: Lista de servicios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Servicio'
 */
exports.obtenerServicios = async (req, res) => {
  try {
    const servicios = await Servicio.findAll();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/v1/servicios/{id}:
 *   get:
 *     summary: Obtener un servicio por ID
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio
 *     responses:
 *       200:
 *         description: Servicio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       404:
 *         description: Servicio no encontrado
 */
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

/**
 * @swagger
 * /api/v1/servicios:
 *   post:
 *     summary: Crear un nuevo servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servicio'
 *     responses:
 *       201:
 *         description: Servicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       500:
 *         description: Error interno
 */
exports.crearServicio = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevoServicio = await Servicio.create({ nombre, descripcion });
    res.status(201).json(nuevoServicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/v1/servicios/{id}:
 *   put:
 *     summary: Actualizar un servicio por ID
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servicio'
 *     responses:
 *       200:
 *         description: Servicio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error interno
 */
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

/**
 * @swagger
 * /api/v1/servicios/{id}:
 *   delete:
 *     summary: Eliminar un servicio por ID
 *     tags: [Servicios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio
 *     responses:
 *       204:
 *         description: Servicio eliminado
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error interno
 */
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
