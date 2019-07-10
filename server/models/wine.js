'use strict';

module.exports = (sequelize, DataTypes) => {
  const Wine = sequelize.define('wine', {
    wsId: DataTypes.STRING,
    winery: DataTypes.STRING,
    wine: DataTypes.STRING,
    vintage: DataTypes.STRING,
    note: DataTypes.TEXT,
    tasterInitials: DataTypes.STRING,
    color: DataTypes.STRING,
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    score: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    issueDate: DataTypes.DATEONLY,
    top100Year: DataTypes.INTEGER,
    top100Rank: DataTypes.INTEGER
  }, {});

  Wine.associate = function(models) {
    // associations can be defined here
  };

  return Wine;
};
