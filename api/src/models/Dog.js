const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false
    },
    años: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://img.favpng.com/20/25/4/dog-paw-logo-cat-png-favpng-Z89TpBXQKbri6trMAcXqnNdJq.jpg"
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    timestamps: false
  });
};
