const express = require('express');

//* Controllers
const {
  getAllMaterias,
  getMateriasbyId,
  crearMaterias,
  editarMaterias,
  borrarMaterias,
} = require('../controllers/materia.controllers');

//* Middlewares
const {
  traerMateriaValida,
  crearMateriaValida,
  editarMateriaValida,
  borrarMateriaValida,
} = require('../middlewares/materias.middlewares');
const { protectSesion } = require('../middlewares/auth.middlewares');

const materiasRoutes = express.Router();

//* Routes
materiasRoutes.get('/', getAllMaterias);
materiasRoutes.get('/:id', traerMateriaValida, getMateriasbyId);

materiasRoutes.use(protectSesion);
materiasRoutes.post('/', crearMateriaValida, crearMaterias);
materiasRoutes.patch('/:id', editarMateriaValida, editarMaterias);
materiasRoutes.delete('/:id', borrarMateriaValida, borrarMaterias);

module.exports = { materiasRoutes };
