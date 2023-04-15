const express = require('express');

//* controllers
const {
  getAllEmpleados,
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

const empleadosRoutes = express.Router();

//* Routes
empleadosRoutes.get('/', getAllEmpleados);
empleadosRoutes.post('/login', login);

empleadosRoutes.post('/', crearEmpleado);
empleadosRoutes.use(protectSesion);
empleadosRoutes.patch('/:id', editarEmpleadoValid, editarEmpleado);
empleadosRoutes.delete('/:id', borrarEmpladoValid, borrarEmpleado);

module.exports = { empleadosRoutes };
