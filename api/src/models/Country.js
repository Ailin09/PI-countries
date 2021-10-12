const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "----",
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "----",
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "----",
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    area: {
      type: DataTypes.INTEGER, //float
      allowNull: true,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true,

    },
  },
    { timestamps: false }
  );
};


