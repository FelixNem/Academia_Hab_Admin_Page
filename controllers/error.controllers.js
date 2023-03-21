const dotenv = require('dotenv');

//* Utils
const { AppError } = require('../utils/appError.utils');

dotenv.config({ path: './config.env' });

const sendErrorDev = (error, req, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error,
    stack: error.stack,
  });
};

const sendErrorProd = (error, req, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message || 'Something went wrong!',
  });
};

const tokenExpiredError = () => {
  return new AppError('Session expired', 403);
};

const tokenInvalidSignatureError = () => {
  return new AppError('Session invalid', 403);
};

const dbUniqueConstraintError = () => {
  return new AppError('The entered email has already been taken', 400);
};

const globalErrorHandler = (error, req, res, next) => {
  // Set default values for original error obj
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'fail';

  sendErrorDev(error, req, res);
};

module.exports = { globalErrorHandler };
