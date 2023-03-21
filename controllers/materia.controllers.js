//* Model
const { Materia } = require('../models/materia.model');

//* Utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getAllMaterias = catchAsync(async (req, res) => {
  const materias = await Materia.findAll({
    where: { status: 'activo' },
    attributes: ['id', 'nombre', 'precio'],
  });

  res.status(200).json({
    status: 'Success',
    data: { materias },
  });
});

const getMateriasbyId = catchAsync(async (req, res) => {
  const { materia } = req;

  res.status(200).json({
    status: 'Success',
    data: { materia },
  });
});

const crearMaterias = catchAsync(async (req, res) => {
  const { nombre, precio } = req.body;

  const newMateria = await Materia.create({ nombre, precio });

  res.status(201).json({
    status: 'Success',
    data: { newMateria },
  });
});

const editarMaterias = catchAsync(async (req, res) => {
  const { materia } = req;
  const { nombre, precio } = req.body;

  await materia.update({
    nombre,
    precio,
  });

  res.status(204).json({
    messague: 'Materia Actualizada!!!',
  });
});

const borrarMaterias = catchAsync(async (req, res) => {
  const { materia } = req;

  await materia.update({
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
