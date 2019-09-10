const express = require('express');

const forecastController = require('../controllers/forecast');

const router = express.Router();

router.get('/getLocations', forecastController.getForecast);

module.exports = router;