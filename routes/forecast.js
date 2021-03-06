const express = require('express');

const forecastController = require('../controllers/forecast');

const router = express.Router();

// GET
router.get('/getKey', forecastController.getKey);

router.get('/getLocations/:location', forecastController.getLocations);

router.get('/getForecastData/:latlon', forecastController.getForecastData);

// POST
router.post('/postDirections', forecastController.postDirections);

router.post('/postSetStartLocations', forecastController.postSetStartLocations);

router.post('/postSaveError', forecastController.postSaveError);

module.exports = router;