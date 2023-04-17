const express = require('express');

//* Controllers
const {
  getAllInscripcions,
  inscribirAlumno,
} = require('../controllers/inscripcion.controllers');

//* Middlewares
const { inscripcionValida } = require('../middlewares/inscripcion.middlewares');
const { protectSesion } = require('../middlewares/auth.middlewares');

const inscripcionesRoutes = express.Router();

//* Routes
inscripcionesRoutes.use(protectSesion);

inscripcionesRoutes.get('/', getAllInscripcions);
inscripcionesRoutes.post('/', inscripcionValida, inscribirAlumno);

module.exports = { inscripcionesRoutes };
