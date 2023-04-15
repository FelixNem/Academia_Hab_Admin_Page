const express = require('express');

//* controllers
const {
  getAllGrupos,
  crearGrupo,
} = require('../controllers/grupo.controllers');

//* Middlewares
const { crearGrupoValido } = require('../middlewares/grupo.middlewares');
const { protectSesion } = require('../middlewares/auth.middlewares');

const gruposRoutes = express.Router();

//* Routes
gruposRoutes.get('/', getAllGrupos);

gruposRoutes.use(protectSesion);
gruposRoutes.post('/', crearGrupoValido, crearGrupo);

module.exports = { gruposRoutes };
