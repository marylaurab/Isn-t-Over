const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    rating: {
      type: DataTypes.DECIMAL,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 5,
      },
    },
    plataforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    createDB: {
      type: DataTypes.BOOLEAN,
      //allowNull: false,
      defaultValue: true,
    },
  });
};
