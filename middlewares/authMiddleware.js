// middlewares\authMiddleware.js
// Middleware para proteger rutas
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // Usuario autenticado, continuar
    }
    res.redirect('/login'); // Redirige a /login si no está autenticado
  };

module.exports = { ensureAuthenticated };