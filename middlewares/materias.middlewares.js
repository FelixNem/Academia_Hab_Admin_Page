const { body, validationResult } = require('express-validator');

//* Model
const { Asignatura } = require('../models/asignatura.model');

//* utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');
const { protectAdminAccount } = require('./auth.middlewares');

const materiaExiste = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const asignatura = await Asignatura.findOne({
    where: { id, status: 'activo' },
  });

  if (!asignatura) {
    return next(new AppError('Materia no encontrada', 404));
  }

  req.asignatura = asignatura;

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

const crearMateriaValida = [
  protectAdminAccount,
  body('nombre')
    .isString()
    .withMessage('Nombre debe ser un String')
    .notEmpty()
    .withMessage('Nombre no puede estar vacio')
    .isLength({ min: 3 })
    .withMessage('Nombre debe ser minimo 3 caracteres'),
  checkValidations,
];

const editarMateriaValida = [
  materiaExiste,
  protectAdminAccount,
  body('nombre')
    .isString()
    .withMessage('Nombre debe ser un String')
    .notEmpty()
    .withMessage('Nombre no puede estar vacio')
    .isLength({ min: 3 })
    .withMessage('Nombre debe ser minimo 3 caracteres'),
  checkValidations,
];

const borrarMateriaValida = [materiaExiste, protectAdminAccount];

const traerMateriaValida = [materiaExiste];

module.exports = {
  crearMateriaValida,
  editarMateriaValida,
  borrarMateriaValida,
  traerMateriaValida,
};
