const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

//* Models
const { Empleado } = require('../models/empleado.model');

//* Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

dotEnv.config({ path: './config.env' });

const protectSesion = catchAsync(async (req, res, next) => {
  //get token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //extract Token
    token = req.headers.authorization.split(' ')[1];
  }

  // check if the token was send or not
  if (!token) {
    return next('The token was invalid', 403);
  }

  const decoded = jwt.verify(token, process.env.ultraSecretKey);

  const empleado = await Empleado.findOne({
    where: { id: decoded.id, status: 'activo' },
  });

  if (!empleado) {
    return next(
      new AppError('The owner of the session is no longer active', 403)
    );
  }

  req.sessionEmpleado = empleado;

  // grant Access
  next();
});

const protectAdminAccount = (req, res, next) => {
  const { sessionEmpleado } = req;

  if (sessionEmpleado.rol !== 'admin') {
    return next(new AppError('Tu NO puedes realizar esta accion', 403));
  }

  next();
};

module.exports = {
  protectSesion,
  protectAdminAccount,
};
