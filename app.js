const express = require('express');

const forecastRoutes = require('./routes/forecast');

const app = express();

app.use('/forecast', forecastRoutes);

app.listen(8080);