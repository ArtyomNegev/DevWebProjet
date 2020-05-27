"use strict";
module.exports = (sequelize, DataTypes) => {
  const Clients = sequelize.define(
    "Clients",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      numTel: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      dateDeNaissance: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {}
  );
  Clients.associate = function (models) {
    Clients.hasMany(models.Messages, {
      foreignKey: "clientId",
      as: "message",
    });
  
    Clients.hasMany(models.Appointments, {
      foreignKey: "clientId",
      as: "appointment",
    });
  };
  return Clients;
};
