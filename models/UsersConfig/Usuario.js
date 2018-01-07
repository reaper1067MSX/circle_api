module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Usuario', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    clave: {
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
    cargo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Cargo',
        key: 'id'
      }
    }
  }, {
    tableName: 'Usuario', timestamps: false
  });
};
