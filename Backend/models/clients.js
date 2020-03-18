'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clients = sequelize.define('Clients', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    numTel: DataTypes.STRING,
    dateDeNaissance: DataTypes.DATE
  }, {});
  Clients.associate = function(models){
    Clients.hasMany(models.Message,{
      foreignKey : 'clientId',
      as: 'message'
    });
  };
  return Clients;
};