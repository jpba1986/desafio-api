const fetch = require('node-fetch');


exports.getLocations = (req, res, next )=>{
    res.status(200).json({
        location:[{
            latitude:444444,  
            longitude: 8888888,  
            timezone:'America' 
        }]
    });
};


exports.postDirections = (req, res, next) =>{
    const latitude  = req.body.latitude;
    const longitude = req.body.longitude;
    const timezone  = req.body.timezone; 
    res.status(201).json({
        message:'done',
        post:{ latitude: latitude, longitude: longitude, timezone: timezone}
    });
};

exports.getForecastData = async (req, res, next) =>{
    try{
        const latlon = req.params.latlon.split(',');
        const latitud  =latlon[0];
        const longitud =latlon[1];
        const darkskyAPIKEY = '2dcd0120d4db2f169cf0ca7fe725803e';
        const api_url = 'https://api.darksky.net/forecast/'+ darkskyAPIKEY +'/'+  latitud +','+ longitud +'?exclude=hourly,flags,minutely,daily,alerts';
        const fetch_response = await fetch(api_url);    
        const json = await fetch_response.json();
        res.json(json); 
    } catch(error){
        res.json({
            'error ': error
        });
    }  
};