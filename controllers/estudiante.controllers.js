//* Models
const { Estudiante } = require('../models/estudiante.model');

//* utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getAllEstudiantes = catchAsync(async (req, res) => {
  const estudiantes = await Estudiante.findAll({
    where: { status: 'activo' },
    attributes: [
      'id',
      'nombre',
      'totalPagado',
      'totalPagar',
      'telContacto',
      'correoContacto',
    ],
  });

  res.status(200).json({
    status: 'Succes',
    data: { estudiantes },
  });
});

const crearEstudiantes = catchAsync(async (req, res) => {
  const {
    nombre,
    correoContacto,
    telContacto,
    totalPagado,
    descuento,
    totalPagar,
  } = req.body;

  const newEstudiante = await Estudiante.create({
    nombre,
    correoContacto,
    telContacto,
    totalPagado,
    descuento,
    totalPagar,
  });

  res.status(201).json({
    status: 'Success',
    data: { newEstudiante },
  });
});

const editarEstudiantes = catchAsync(async (req, res) => {
  const { estudiante } = req;
  const { nombre } = req.body;

  estudiante.update({
    nombre,
  });

  res.status(204).json({
    messague: 'Alumno Actualizado',
  });
});

const borrarEstudiantes = catchAsync(async (req, res) => {
  const { estudiante } = req;

  estudiante.update({
    status: 'inactivo',
  });

  res.status(204).json({
    messague: `${estudiante.nombre} a sido dado de BAJA!!!`,
  });
});

module.exports = {
  getAllEstudiantes,
  crearEstudiantes,
  editarEstudiantes,
  borrarEstudiantes,
};
