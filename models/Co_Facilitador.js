/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Co_Facilitador', {
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    cod_apadrinado: {
      type: DataTypes.STRING,
      allowNull: true
    },
    localidad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    estado: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_inscripcion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'Co_Facilitador' , timestamps: false
  });
};
