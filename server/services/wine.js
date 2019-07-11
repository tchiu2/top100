const Wine = require('../models').wine;

const findById = id =>
  Wine.findByPk(id, {
    attributes: ['note', 'tasterInitials']
  })
    .catch(err => console.log('Error finding wine:', err));

module.exports = {
  findById,
};
