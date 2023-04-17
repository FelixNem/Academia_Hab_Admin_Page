//* Models
const { Inscripcion } = require('../models/inscripcion.model');
const { Estudiante } = require('../models/estudiante.model');
const { Grupo } = require('../models/grupo.model');
const { Empleado } = require('../models/empleado.model');

//* Utils
const { catchAsync } = require('../utils/catchAsync.utils');

const getAllInscripcions = catchAsync(async (req, res) => {
  const inscripciones = await Inscripcion.findAll({
    attributes: ['id'],
    include: [
      {
        model: Estudiante,
        attributes: ['id', 'nombre'],
      },
      {
        model: Grupo,
        attributes: ['id', 'nombre', 'totalDias', 'costoTotal'],
        include: {
          model: Empleado,
          attributes: ['id', 'nombre', 'rol'],
        },
      },
    ],
  });

  res.status(200).json({
    status: 'Success',
    data: { inscripciones },
  });
});

const inscribirAlumno = catchAsync(async (req, res) => {
  const { estudianteId, grupoId } = req.body;
  const { estudiante, grupo } = req;

  const newInscripcion = await Inscripcion.create({
    estudianteId,
    grupoId,
  });

  const costoAsignatura = grupo.costoTotal;
  const descuento = estudiante.descuento;

  const nwMontoBruto = estudiante.montoBruto + costoAsignatura;

  await estudiante.update({
    montoBruto: nwMontoBruto,
    totalPagar: nwMontoBruto - descuento,
  });

  res.status(201).json({
    status: 'Success',
    data: { newInscripcion },
  });
});

module.exports = {
  getAllInscripcions,
  inscribirAlumno,
};
