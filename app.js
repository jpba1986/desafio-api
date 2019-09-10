const express = require('express');
const bodyParser = require('body-parser');

const forecastRoutes = require('./routes/forecast');

const app = express();

app.use(bodyParser.json());

app.use('/forecast', forecastRoutes);

app.listen(8080);