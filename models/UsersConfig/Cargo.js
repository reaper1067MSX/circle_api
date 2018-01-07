
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cargo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Cargo', timestamps: false
  });
};
