module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Catalogos', {
    tabla: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.CHAR,
      allowNull: true
    }
  }, {
    tableName: 'Catalogos', timestamps: false
  });
};
