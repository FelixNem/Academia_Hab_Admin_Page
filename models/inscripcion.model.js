const { db, DataTypes } = require('../utils/db.utils');

const Inscripcion = db.define('inscripcion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  estudianteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  grupoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Inscripcion };
