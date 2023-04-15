const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

//* Models
const { Empleado } = require('../models/empleado.model');

//* utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

dotEnv.config({ path: './config.env' });

const getAllEmpleados = catchAsync(async (req, res, next) => {
  const empleados = await Empleado.findAll({
    where: { status: 'activo' },
    attributes: ['id', 'nombre', 'nickname', 'rol'],
  });

  res.status(200).json({
    status: 'Succes',
    data: { empleados },
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const admins = await Empleado.findAll({
    where: { status: 'activo', rol: 'admin' },
    attributes: ['id', 'nombre', 'nickname', 'rol'],
  });

  res.status(200).json({
    status: 'Succes',
    data: { admins },
  });
});

const getAllProfes = catchAsync(async (req, res) => {
  const admins = await Empleado.findAll({
    where: { status: 'activo', rol: 'profe' },
    attributes: ['id', 'nombre', 'nickname', 'rol'],
  });

  res.status(200).json({
    status: 'Succes',
    data: { admins },
  });
});

const crearEmpleado = catchAsync(async (req, res, next) => {
  const { nombre, nickname, password, rol } = req.body;
  //*cifrando password
  const salt = await bcrypt.genSalt(12);
  const hasedPassword = await bcrypt.hash(password, salt);

  const newEmpleado = await Empleado.create({
    nombre,
    nickname,
    password: hasedPassword,
    rol,
  });

  newEmpleado.password = ':P';

  res.status(201).json({
    status: 'Succes',
    data: { newEmpleado },
  });
});

const editarEmpleado = catchAsync(async (req, res, next) => {
  const { empleado } = req;
  const { nombre } = req.body;

  await empleado.update({
    nombre,
  });

  res.status(204).json({
    messague: 'Empleado Actualizado!!!',
  });
});

const borrarEmpleado = catchAsync(async (req, res, next) => {
  const { empleado } = req;

  await empleado.update({
    status: 'inactivo',
  });

  res.status(204).json({
    messague: `${empleado.nombre} a sido DESPEDIDO!!!`,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { nickname, password } = req.body;

  const empleado = await Empleado.findOne({
    where: { nickname, status: 'activo' },
  });

  if (!empleado || !(await bcrypt.compare(password, empleado.password))) {
    return next(new AppError('Credenciales Invalidas', 404));
  }

  empleado.password = undefined;

  const token = jwt.sign({ id: empleado.id }, process.env.ultraSecretKey, {
    expiresIn: '1h',
  });

  res.status(200).json({
    status: 'Success',
    messague: 'Estas loggeado',
    data: { empleado, token },
  });
});

module.exports = {
  getAllEmpleados,
  getAllAdmins,
  getAllProfes,
  crearEmpleado,
  editarEmpleado,
  borrarEmpleado,
  login,
};
