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
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      numTel: DataTypes.STRING,
      dateDeNaissance: DataTypes.DATE,
    },
    {}
  );
  Clients.associate = function (models) {
    Clients.hasMany(models.Messages, {
      foreignKey: "clientId",
      as: "message",
    });
  };
  return Clients;
};
