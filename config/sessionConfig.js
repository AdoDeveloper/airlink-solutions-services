const session = require('express-session');
const passport = require('./passportConfig');

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Duración de la cookie: 7 días
    httpOnly: true,
  },
});

module.exports = { passport, sessionMiddleware };
