const { body, validationResult } = require('express-validator');

//* Models
const { Estudiante } = require('../models/estudiante.model');
const { Grupo } = require('../models/grupo.model');

//* Middlewares
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

const estudianteExiste = catchAsync(async (req, res, next) => {
  const { estudianteId: id } = req.body;

  const estudiante = await Estudiante.findOne({
    where: { id, status: 'activo' },
  });

  if (!estudiante) {
    return next(new AppError('Estudiante no Valido', 404));
  }

  req.estudiante = estudiante;

  next();
});

const grupoExiste = catchAsync(async (req, res, next) => {
  const { grupoId: id } = req.body;

  const grupo = await Grupo.findOne({
    where: { id, status: 'activo' },
  });

  if (!grupo) {
    return next(new AppError('Grupo no Valida', 404));
  }

  req.grupo = grupo;

  next();
});

const inscripcionValida = [
  protectAdminAccount,
  estudianteExiste,
  grupoExiste,
  checkValidations,
];

module.exports = { inscripcionValida };
