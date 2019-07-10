const { wine } = require('../models');
const { findById } = require('../services/wine');

const list = (req, res) =>
  wine.findAll({
    attributes: [
      'top100Rank',
      'score',
      'winery',
      'wine',
      'vintage',
      'color',
      'country',
      'region',
    ],
    order: [
      ['top100Rank', 'ASC'],
    ],
  })
    .then(wines => res.status(200).send(wines))
    .catch(err => res.status(404).send(err));

const note = (req, res) =>
  findById(req.params.wineId)
    .then(note => res.status(200).send(note))
    .catch(err => res.status(400).send(err));

module.exports = {
  list,
  note,
};
