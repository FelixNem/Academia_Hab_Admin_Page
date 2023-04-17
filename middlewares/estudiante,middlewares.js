const { body, validationResult } = require('express-validator');

//* Model
const { Estudiante } = require('../models/estudiante.model');

//* Middlewares
const { protectAdminAccount } = require('./auth.middlewares');

//* utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

const estudianteExiste = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const estudiante = await Estudiante.findOne({
    where: { id, status: 'activo' },
  });

  if (!estudiante) {
    return next(new AppError('Estudiente no encontrado'));
  }

  req.estudiante = estudiante;

  next();
});

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

//! Faltan los mensajes pero me dio Weba
const crearEstudianteValido = [
  protectAdminAccount,
  body('nombre').isString().notEmpty().isLength({ min: 4 }),
  body('correoContacto').isEmail(),
  body('telContacto').notEmpty().isLength({ min: 10, max: 10 }),
  // body('montoBruto').isNumeric(),
  // body('totalPagado').isNumeric(),
  // body('descuento').isNumeric(),
  // body('totalPagar').isNumeric(),
  checkValidations,
];

const editarEstudienteValido = [
  protectAdminAccount,
  estudianteExiste,
  body('nombre').isString().notEmpty().isLength({ min: 4 }),
  checkValidations,
];

const borrarEstudienteValido = [
  protectAdminAccount,
  estudianteExiste,
  checkValidations,
];

module.exports = {
  crearEstudianteValido,
  editarEstudienteValido,
  borrarEstudienteValido,
};
