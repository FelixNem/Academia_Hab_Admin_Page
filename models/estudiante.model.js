const { db, DataTypes } = require('../utils/db.utils');

const Estudiante = db.define('estudiante', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correoContacto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telContacto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  montoBruto: {
    type: DataTypes.REAL,
    defaultValue: 0,
  },
  descuento: {
    type: DataTypes.REAL,
    defaultValue: 0,
  },
  totalPagar: {
    type: DataTypes.REAL,
    defaultValue: 0,
  },
  totalPagado: {
    type: DataTypes.REAL,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    defaultValue: 'activo',
  },
});

module.exports = { Estudiante };
