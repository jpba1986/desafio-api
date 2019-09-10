const express = require('express');
const bodyParser = require('body-parser');


const forecastRoutes = require('./routes/forecast');

const app = express();

app.use(bodyParser.json());

app.use((req, res ,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers','*');
    next();
});

app.use('/forecast', forecastRoutes);

app.listen(8080, () => {
    console.log('Server started!')
  });