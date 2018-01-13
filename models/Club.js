/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Club', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    objetivo_Estrategico: {
      type: DataTypes.STRING,
      allowNull: true
    },
    programa: {
      type: DataTypes.STRING,
      allowNull: true
    },
    observacion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Club' , timestamps: false
  });
};
