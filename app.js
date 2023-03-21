const express = require('express');

//* Routers
const { empleadosRoutes } = require('./routes/empleado.routes');
const { estudientesRoutes } = require('./routes/estudiente.routes');
const { materiasRoutes } = require('./routes/materia.routes');

//! controller
const { globalErrorHandler } = require('./controllers/error.controllers');

// init express Server
const app = express();
app.use(express.json());

//* Endponits
app.use('/api/v1/empleados', empleadosRoutes);
app.use('/api/v1/estudiantes', estudientesRoutes);
app.use('/api/v1/materias', materiasRoutes);

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
