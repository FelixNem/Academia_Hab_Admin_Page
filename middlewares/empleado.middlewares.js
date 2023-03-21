const { body, validationResult } = require('express-validator');

//*Model
const { Empleado } = require('../models/empleado.model');

//* Middleware
const { protectAdminAccount } = require('./auth.middlewares');

//* utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

const empleadoExiste = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const empleado = await Empleado.findOne({
    where: { id, status: 'activo' },
  });

  if (!empleado) {
    return next(new AppError('Empleado No Encontrado', 404));
  }

  req.empleado = empleado;
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

const crearEmpleadoValid = [
  protectAdminAccount,
  body('nombre')
    .isString()
    .withMessage('Nombre debe ser un String')
    .notEmpty()
    .withMessage('Nombre no puede estar vacio')
    .isLength({ min: 3 })
    .withMessage('Nombre debe ser minimo 3 caracteres'),
  body('nickname')
    .isString()
    .withMessage('nickname debe ser un String')
    .notEmpty()
    .withMessage('nickname no puede estar vacio')
    .isLength({ min: 4 })
    .withMessage('nickname debe ser minimo 3 caracteres'),
  body('password')
    .isString()
    .withMessage('Password debe ser un String')
    .notEmpty()
    .withMessage('Password Nombre no puede estar vacio')
    .isLength({ min: 8 })
    .withMessage('Password debe ser minimo 8 caracteres'),
  checkValidations,
];

const editarEmpleadoValid = [
  protectAdminAccount,
  empleadoExiste,
  body('nombre')
    .isString()
    .withMessage('Nombre debe ser un String')
    .notEmpty()
    .withMessage('Nombre no puede estar vacio')
    .isLength({ min: 3 })
    .withMessage('Nombre debe ser minimo 3 caracteres'),
  checkValidations,
];

const borrarEmpladoValid = [empleadoExiste, protectAdminAccount];

module.exports = {
  crearEmpleadoValid,
  editarEmpleadoValid,
  borrarEmpladoValid,
};
