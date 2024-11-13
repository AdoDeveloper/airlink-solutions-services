const Handlebars = require("handlebars");

// Registrar un helper para obtener el año actual
Handlebars.registerHelper("currentYear", () => {
  return new Date().getFullYear();
});

// Exportar los helpers para que sean usados en el motor de plantillas
module.exports = {
  helpers: Handlebars.helpers,
};
