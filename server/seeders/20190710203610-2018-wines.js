'use strict';
const raw = require('./2018_full.json');

const wines = raw.map(wine => ({
  wsId: wine.id,
  winery: wine.winery_full,
  wine: wine.wine_full,
  vintage: wine.vintage,
  note: wine.note,
  tasterInitials: wine.taster_initials,
  color: wine.color,
  country: wine.country,
  region: wine.region,
  score: wine.score,
  price: wine.price,
  issueDate: new Date(wine.issue_date),
  top100Year: wine.top100_year,
  top100Rank: wine.top100_rank,
  createdAt: new Date(),
  updatedAt: new Date()
}));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('wines', wines, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('wines', null, {});
  }
};
