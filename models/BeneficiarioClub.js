module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BeneficiarioClub', {
    club: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    beneficiario: {
      type: DataTypes.STRING,
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
      type: DataTypes.INTEGER,
      allowNull: true
    },
    desde: {
      type: DataTypes.TIME,
      allowNull: true
    },
    hasta: {
      type: DataTypes.TIME,
      allowNull: true
    },
    faltas_fk: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'BeneficiarioClub', timestamps: false
  });
};
