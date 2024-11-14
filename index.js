const express = require('express');
const exphbs = require("express-handlebars");
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');
const { passport, sessionMiddleware } = require('./config/sessionConfig');

const Handlebars = require("./lib/handlebars");
const axios = require('axios');
const cron = require('node-cron');

require('dotenv').config();

const app = express();

// Configuración de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET, // Clave secreta desde .env
  resave: false,
  saveUninitialized: false,
}));

// Inicializar Passport y Flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware para mensajes Flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg'); // Mensajes de éxito
  res.locals.error_msg = req.flash('error_msg'); // Mensajes de error
  res.locals.error = req.flash('error'); // Errores generados por Passport
  next();
});

// Configuración de la carpeta de vistas y Handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main", // Layout principal
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: Handlebars.helpers,
    runtimeOptions: {
      allowProtoPropertiesByDefault: true, // Permitir propiedades heredadas
      allowProtoMethodsByDefault: true, // Permitir métodos heredados
    },
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(express.urlencoded({ extended: false })); // Parsear datos de formularios
app.use(express.json()); // Parsear JSON
app.use(cors());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a la base de datos
const sequelize = require('./config/database');
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Sincronización de modelos
const Servicio = require('./models/Servicio');
sequelize.sync({ force: false }).then(async () => {
  console.log('Tablas sincronizadas.');
  const count = await Servicio.count();
  if (count === 0) {
    // Precargar servicios iniciales
    await Servicio.bulkCreate([
      {
        nombre: 'Capacitación',
        descripcion: 'Ofrecemos programas de capacitación en las oficinas de nuestros clientes, enfocados en las mejores prácticas de desarrollo de software, desarrollo móvil y entrega de servicios (ITIL).',
      },
      {
        nombre: 'Consultoría ITIL',
        descripcion: 'Proporcionamos soporte de consultoría y la implementación de herramientas de cumplimiento ITIL, mejorando la calidad y la eficiencia del servicio.',
      },
      {
        nombre: 'Desarrollo de Software',
        descripcion: 'Nuestra experiencia abarca el desarrollo de aplicaciones móviles en plataformas Android e iOS, ofreciendo una experiencia de usuario superior.',
      },
      {
        nombre: 'e-Learning',
        descripcion: 'Transforma la forma en que tu organización aprende y crece con nuestra plataforma de eLearning líder en la industria.',
      },
      {
        nombre: 'Outsourcing IT',
        descripcion: 'Ofrecemos una amplia gama de servicios de outsourcing de TI, diseñados para ofrecer flexibilidad y reducción de costos.',
      },
      {
        nombre: 'Reclutamiento IT',
        descripcion: 'Ayudamos a encontrar y contratar a los mejores talentos para impulsar la innovación y el crecimiento dentro de tu organización.',
      },
    ]);
    console.log('Servicios iniciales cargados.');
  }
});

// Middleware para manejar la autenticación en las vistas
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated(); // Verifica si el usuario está autenticado
  next();
});

// Rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);
app.use(sessionMiddleware);
// Rutas de servicios y API
const servicioRoutes = require('./routes/servicioRoutes');
const apiRoutes = require('./routes/apiRoutes');
app.use('/', servicioRoutes);
app.use('/api/v1', apiRoutes);
// Configurar la documentación de Swagger en una ruta
const docapiRoutes = require('./routes/docapiRoutes');
// Ruta para la documentación de Swagger
app.use('/api-docs', docapiRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).render('errors/404', { title: '404 - Página no encontrada' });
});

// Configuración de cron para mantener activo el servidor con una auto-petición cada 10 minutos
cron.schedule('*/10 * * * *', async () => {
  try {
      await axios.get('https://airlink-solutions-services.onrender.com/login'); // Asegúrate de que esta URL sea la de tu servidor en Render
      console.log('Auto-petición enviada para mantener el servidor activo.');
  } catch (error) {
      console.error('Error al intentar mantener el servidor activo:', error.message);
  }
});

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
