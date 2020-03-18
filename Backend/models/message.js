'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    sujet: DataTypes.STRING,
    contenu: DataTypes.STRING,
    dateEnvoi: DataTypes.DATE,
    clientId: DataTypes.INTEGER
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.Clients,{
      foreignKey: 'clientId',
      onDelete : 'CASCADE'
    })
  };
  return Message;
};