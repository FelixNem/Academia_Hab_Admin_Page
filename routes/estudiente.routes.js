const express = require('express');

//* controllers
const {
  getAllEstudiantes,
  crearEstudiantes,
  editarEstudiantes,
  borrarEstudiantes,
} = require('../controllers/estudiante.controllers');

//* Middlewares
const {
  crearEstudianteValido,
  editarEstudienteValido,
  borrarEstudienteValido,
} = require('../middlewares/estudiante,middlewares');
const { protectSesion } = require('../middlewares/auth.middlewares');

const estudientesRoutes = express.Router();

//* Routes
estudientesRoutes.get('/', getAllEstudiantes);

estudientesRoutes.use(protectSesion);
estudientesRoutes.post('/', crearEstudianteValido, crearEstudiantes);
estudientesRoutes.patch('/:id', editarEstudienteValido, editarEstudiantes);
estudientesRoutes.delete('/:id', borrarEstudienteValido, borrarEstudiantes);

module.exports = { estudientesRoutes };
