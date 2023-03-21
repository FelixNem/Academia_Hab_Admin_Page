const express = require('express');

//* controllers
const {
  getAllEmpleados,
  crearEmpleado,
  editarEmpleado,
  borrarEmplado,
  login,
} = require('../controllers/empleado.controllers');

//* Middlewares
const {
  crearEmpleadoValid,
  editarEmpleadoValid,
  borrarEmpladoValid,
} = require('../middlewares/empleado.middlewares');
const { protectSesion } = require('../middlewares/auth.middlewares');

const empleadosRoutes = express.Router();

//* Routes
empleadosRoutes.get('/', getAllEmpleados);
empleadosRoutes.post('/login', login);

empleadosRoutes.use(protectSesion);
empleadosRoutes.post('/', crearEmpleadoValid, crearEmpleado);
empleadosRoutes.patch('/:id', editarEmpleadoValid, editarEmpleado);
empleadosRoutes.delete('/:id', borrarEmpladoValid, borrarEmplado);

module.exports = { empleadosRoutes };
