const { db, DataTypes } = require('../utils/db.utils');

const Grupo = db.define('grupo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  empleadoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  asignaturaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalDias: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  costoTotal: {
    type: DataTypes.REAL,
    allowNull: false,
  },
  //TODO: agregar status para el softdelete
});

module.exports = { Grupo };
