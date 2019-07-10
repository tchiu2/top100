const express = require('express');
const router = express.Router();

const wineController = require('../controllers').wine;

router.get('/wines', wineController.list);
router.get('/note/:wineId', wineController.note);

module.exports = router;
