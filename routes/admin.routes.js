const express = require('express');

//* controllers
const {
  getAllAdmins,
  crearEmpleado,
  editarEmpleado,
  borrarEmpleado,
  login,
} = require('../controllers/empleado.controllers');

//* Middlewares
const {
  crearEmpleadoValid,
  editarEmpleadoValid,
  borrarEmpladoValid,
} = require('../middlewares/empleado.middlewares');
const { protectSesion } = require('../middlewares/auth.middlewares');

const adminRoutes = express.Router();

//*Routes
adminRoutes.get('/', getAllAdmins);
