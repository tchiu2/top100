'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('wines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wsId: {
        type: Sequelize.STRING
      },
      winery: {
        type: Sequelize.STRING
      },
      wine: {
        type: Sequelize.STRING
      },
      vintage: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.TEXT
      },
      tasterInitials: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      issueDate: {
        type: Sequelize.DATEONLY
      },
      top100Year: {
        type: Sequelize.INTEGER
      },
      top100Rank: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('wines');
  }
};
