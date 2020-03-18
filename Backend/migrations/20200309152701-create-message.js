'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sujet: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contenu: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateEnvoi: {
        allowNull: false,
        type: Sequelize.DATE
      },
      clientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete : 'CASCADE',
        references:{
          model:'Clients',
          key:'userId',
          as:'clientId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};