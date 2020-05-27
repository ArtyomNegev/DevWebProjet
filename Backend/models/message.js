"use strict";
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    "Messages",
    {
      sujet: DataTypes.STRING,
      contenu: DataTypes.STRING,
      dateEnvoi: DataTypes.DATE,
      clientId: DataTypes.INTEGER,
    },
    {}
  );
  Messages.associate = function (models) {
    Messages.belongsTo(models.Clients, {
      foreignKey: "clientId",
      onDelete: "CASCADE",
    });
  };
  return Messages;
};
