module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Parametros', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tipo: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fecha_modificacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    estado: {
      type: DataTypes.CHAR,
      allowNull: true
    }
  }, {
    tableName: 'Parametro', timestamps: false
  });
};
