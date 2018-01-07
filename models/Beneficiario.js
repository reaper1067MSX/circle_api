module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Beneficiario', {
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
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
    fecha_nac: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    estado: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_inscripcion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dolencia_medica: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unidad_academica: {
      type: DataTypes.STRING,
      allowNull: true
    },
    periodo_electivo: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    promedio_general: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    representante_ced: {
      type: DataTypes.STRING,
      allowNull: true
    },
    representante_nombre: {
      type: DataTypes.STRING,
      allowNull: true
    },
    representante_apellido: {
      type: DataTypes.STRING,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Beneficiario', timestamps: false
  });
};
