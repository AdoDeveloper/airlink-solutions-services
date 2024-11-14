const express = require('express');
const router = express.Router();
const passport = require('passport');

// Renderizar la vista de login
router.get('/login', (req, res) => {
  const error_msg = req.flash('error'); // Capturar mensaje de error (si existe)
  const success_msg = req.flash('success_msg'); // Capturar mensajes de éxito (si existe)
  res.render('login', {
    title: 'Iniciar Sesión',
    error_msg: error_msg.length > 0 ? error_msg[0] : null,
    success_msg: success_msg.length > 0 ? success_msg[0] : null,
  });
});

// Manejar el envío del formulario de login
router.post('/login', (req, res, next) => {
  const rememberMe = req.body.remember_me; // Capturar el valor del checkbox "Recuérdame"

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error durante la autenticación:', err);
      req.flash('error', 'Ocurrió un error inesperado. Inténtalo nuevamente.');
      return res.redirect('/login');
    }

    if (!user) {
      req.flash('error', info?.message || 'Credenciales inválidas.');
      return res.redirect('/login');
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Error al iniciar sesión:', err);
        req.flash('error', 'Error al iniciar sesión. Inténtalo nuevamente.');
        return res.redirect('/login');
      }

      // Configurar duración de la cookie según "Recuérdame"
      if (rememberMe) {
        req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 días
      } else {
        req.session.cookie.expires = false; // Expira al cerrar el navegador
      }

      // Redirigir al usuario autenticado
      return res.redirect('/servicios');
    });
  })(req, res, next);
});

// Manejar el cierre de sesión
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      req.flash('error', 'No se pudo cerrar la sesión. Inténtalo nuevamente.');
      return res.redirect('/servicios');
    }

    req.session.destroy((err) => {
      if (err) {
        console.error('Error al destruir la sesión:', err);
        req.flash('error', 'No se pudo cerrar la sesión correctamente.');
        return res.redirect('/servicios');
      }
      res.redirect('/login');
    });
  });
});

module.exports = router;
