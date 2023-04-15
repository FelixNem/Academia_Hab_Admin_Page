//* Model
const { Asignatura } = require('../models/asignatura.model');

//* Utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getAllMaterias = catchAsync(async (req, res) => {
  const asignaturas = await Asignatura.findAll({
    where: { status: 'activo' },
    attributes: ['id', 'nombre'],
  });

  res.status(200).json({
    status: 'Success',
    data: { asignaturas },
  });
});

const getMateriasbyId = catchAsync(async (req, res) => {
  const { asignatura } = req;

  res.status(200).json({
    status: 'Success',
    data: { asignatura },
  });
});

const crearMaterias = catchAsync(async (req, res) => {
  const { nombre } = req.body;

  const newAsignatura = await Asignatura.create({ nombre });

  res.status(201).json({
    status: 'Success',
    data: { newAsignatura },
  });
});

const editarMaterias = catchAsync(async (req, res) => {
  const { asignatura } = req;
  const { nombre } = req.body;

  await asignatura.update({
    nombre,
  });

  res.status(204).json({
    messague: 'Materia Actualizada!!!',
  });
});

const borrarMaterias = catchAsync(async (req, res) => {
  const { asignatura } = req;

  await asignatura.update({
    status: 'inactivo',
  });

  res.status(204).json({
    messague: `Materia Eliminada!!!`,
  });
});

module.exports = {
  getAllMaterias,
  getMateriasbyId,
  crearMaterias,
  editarMaterias,
  borrarMaterias,
};
