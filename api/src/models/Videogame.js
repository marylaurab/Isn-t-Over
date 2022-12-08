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
    title: {
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
    image:{
      type:DataTypes.STRING,
     
      defaultValue: "https://i.pinimg.com/736x/58/fe/9b/58fe9bb8e043ebf9a7e5e129c43ac97c.jpg"
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    }
  });
};
