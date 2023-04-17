const express = require('express');

//* Routers
const { empleadosRoutes } = require('./routes/empleado.routes');
const { estudientesRoutes } = require('./routes/estudiente.routes');
const { materiasRoutes } = require('./routes/asignatura.routes');
const { gruposRoutes } = require('./routes/grupo.routes');
const { inscripcionesRoutes } = require('./routes/inscripciones.routes');

//! controller
const { globalErrorHandler } = require('./controllers/error.controllers');

// init express Server
const app = express();
app.use(express.json());

//* Endponits
const url = '/api/v1';

app.use(`${url}/empleados`, empleadosRoutes);
app.use(`${url}/estudiantes`, estudientesRoutes);
app.use(`${url}/materias`, materiasRoutes);
app.use(`${url}/grupos`, gruposRoutes);
app.use(`${url}/inscripciones`, inscripcionesRoutes);

//! GlobalErrorHandler
app.use(globalErrorHandler);

//* catch non-exitsing endpoints
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    messague: `${req.method} ${req.url} does not exists in our server`,
  });
});

module.exports = { app };
