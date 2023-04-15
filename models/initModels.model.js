//* Models
const { Empleado } = require('./empleado.model');
const { Asignatura } = require('./asignatura.model');
const { Grupo } = require('./grupo.model');
const { Inscripcion } = require('./inscripcion.model');
const { Estudiante } = require('./estudiante.model');

const initModels = () => {
  Empleado.hasMany(Grupo, { foreignKey: 'empleadoId' });
  Grupo.belongsTo(Empleado);

  Asignatura.hasMany(Grupo, { foreignKey: 'asignaturaId' });
  Grupo.belongsTo(Asignatura);

  Estudiante.hasMany(Inscripcion, { foreignKey: 'estudianteId' });
  Inscripcion.belongsTo(Estudiante);

  Grupo.hasMany(Inscripcion, { foreignKey: 'grupoId' });
  Inscripcion.belongsTo(Grupo);
};

module.exports = { initModels };
