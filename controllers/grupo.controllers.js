//* Models
const { Grupo } = require('../models/grupo.model');
const { Empleado } = require('../models/empleado.model');
const { Asignatura } = require('../models/asignatura.model');

//* Utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getAllGrupos = catchAsync(async (req, res) => {
  const grupos = await Grupo.findAll({
    attributes: ['id', 'nombre', 'totalDias', 'costoTotal'],
    include: [
      {
        model: Empleado,
        attributes: ['id', 'nombre', 'rol'],
      },
      {
        model: Asignatura,
        attributes: ['id', 'nombre'],
      },
    ],
  });

  res.status(200).json({
    status: 'Success',
    data: {
      grupos,
    },
  });
});

const crearGrupo = catchAsync(async (req, res) => {
  const { empleadoId, asignaturaId, nombre, totalDias, costoTotal } = req.body;

  const newGrupo = await Grupo.create({
    empleadoId,
    asignaturaId,
    nombre,
    totalDias,
    costoTotal,
  });

  res.status(201).json({
    status: 'Success',
    data: { newGrupo },
  });
});

module.exports = {
  getAllGrupos,
  crearGrupo,
};
