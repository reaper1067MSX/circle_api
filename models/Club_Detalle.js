/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Club_Detalle', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    punto_satelite: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    secuencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dia: {
      type: DataTypes.CHAR,
      allowNull: false,
      primaryKey: true
    },
    nombre_punto_satelite: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hora_desde: {
      type: DataTypes.TIME,
      allowNull: true
    },
    hora_hasta: {
      type: DataTypes.TIME,
      allowNull: true
    },
    estado: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cod_cofacilitador: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Club_Detalle', timestamps: false
  });
};
