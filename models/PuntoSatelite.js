/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PuntoSatelite', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    localidad: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tipo: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    longitud: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latitud: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    estado: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    fecha_registro: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    responsable: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'PuntoSatelite', timestamps: false
  });
};
