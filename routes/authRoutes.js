// routes\authRoutes.js

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Renderizar la vista de login
router.get('/login', (req, res) => {
  const error_msg = req.flash('error'); // Capturar mensaje de error (si existe)
  res.render('login', { title: 'Iniciar Sesión', error_msg });
});

// Manejar el envío del formulario de login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err); // Manejo de errores del servidor
      return res.redirect('/login');
    }
    if (!user) {
      // Si no se encuentra el usuario, agregar el mensaje de error
      req.flash('error', info.message || 'Credenciales inválidas');
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error(err); // Manejo de errores al iniciar sesión
        return res.redirect('/login');
      }
      // Redirigir al usuario autenticado
      return res.redirect('/servicios');
    });
  })(req, res, next);
});

// Manejar el cierre de sesión
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'Has cerrado sesión exitosamente.');
    res.redirect('/login'); // Redirigir al login después de cerrar sesión
  });
});

module.exports = router;

