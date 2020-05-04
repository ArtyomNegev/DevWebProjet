"use strict";
module.exports = (sequelize, DataTypes) => {
  const Appointments = sequelize.define(
    "Appointments",
    {
		id: {
	        allowNull: false,
	        autoIncrement: true,
	        primaryKey: true,
	        type: DataTypes.INTEGER
	      },
      debut : { type: DataTypes.DATE, allowNull: false },
    //  jour de fin devrait etre egal a jour du debut, sauf peut-etre pour vacances de la psychologue
      fin : { type: DataTypes.DATE, allowNull: false },

      commentaire: DataTypes.TEXT,
     
      clientId: DataTypes.INTEGER,

// indirect values
	  date: DataTypes.DATEONLY,
      heureDebut : DataTypes.STRING(5)    // format   HH:MM
    },
    {}
  );
  Appointments.associate = function (models) {
    Appointments.belongsTo(models.Clients, {
      foreignKey: "clientId",
      onDelete: "CASCADE",
    });
  };
  return Appointments;
};
