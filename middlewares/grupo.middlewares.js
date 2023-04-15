const { body, validationResult } = require('express-validator');

//* Model
const { Empleado } = require('../models/empleado.model');
const { Asignatura } = require('../models/asignatura.model');

//* Middleware
const { protectAdminAccount } = require('./auth.middlewares');

//* Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join('. ');

    return next(new AppError(message, 400));
  }

  next();
};

const asignaturaExiste = catchAsync(async (req, res, next) => {
  const { asignaturaId: id } = req.body;

  const asignatura = await Asignatura.findOne({
    where: { id, status: 'activo' },
  });

  if (!asignatura) {
    return next(new AppError('Materia no Valida', 404));
  }

  next();
});

const empleadoExiste = catchAsync(async (req, res, next) => {
  const { empleadoId: id } = req.body;

  const empleado = await Empleado.findOne({
    where: { id, status: 'activo', rol: 'profe' },
  });

  if (!empleado) {
    return next(new AppError('Empleado No Valido', 404));
  }
  next();
});

const crearGrupoValido = [
  protectAdminAccount,
  empleadoExiste,
  asignaturaExiste,
  body('nombre')
    .isString()
    .withMessage('Nombre debe ser un String')
    .notEmpty()
    .withMessage('Nombre no puede estar vacio')
    .isLength({ min: 3 })
    .withMessage('Nombre debe ser minimo 3 caracteres'),
  body('totalDias').isNumeric(),
  body('costoTotal').isNumeric(),
];

module.exports = { crearGrupoValido };
