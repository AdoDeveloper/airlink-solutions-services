// config\passportConfig.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Configurar estrategia local
passport.use(new LocalStrategy(
  {
    usernameField: 'email', // Campo del formulario para el correo electrónico
    passwordField: 'password', // Campo del formulario para la contraseña
  },
  async (email, password, done) => {
    try {
      // Obtener credenciales de las variables de entorno
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPasswordHash = process.env.ADMIN_PASSWORD; // Contraseña encriptada desde .env

      // Verificar si el correo coincide
      if (email !== adminEmail) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      // Verificar si la contraseña proporcionada coincide con el hash
      const isMatch = await bcrypt.compare(password, adminPasswordHash);
      if (!isMatch) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      // Usuario autenticado exitosamente
      return done(null, { email });
    } catch (error) {
      console.error('Error en la autenticación:', error);
      return done(error);
    }
  }
));

// Serializar usuario (almacenar en la sesión)
passport.serializeUser((user, done) => {
  done(null, user.email);
});

// Deserializar usuario (recuperar de la sesión)
passport.deserializeUser((email, done) => {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (email === adminEmail) {
    done(null, { email });
  } else {
    done(null, false);
  }
});

module.exports = passport;
