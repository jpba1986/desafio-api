const express = require('express');

const forecastController = require('../controllers/forecast');

const router = express.Router();

// GET
router.get('/getLocations', forecastController.getLocations);

router.get('/getForecastData/:latlon', forecastController.getForecastData);

// POST
router.post('/postDirections', forecastController.postDirections);

module.exports = router;