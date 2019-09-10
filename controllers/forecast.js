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
        const latitud  =req.body.latitud;
        const longitud =req.body.longitud;
        const darkskyAPIKEY = '2dcd0120d4db2f169cf0ca7fe725803e';
        //const api_url = 'https://api.darksky.net/forecast/'+ darkskyAPIKEY +'/'+  latitud +','+ longitud +'?exclude=hourly,flags,minutely,daily,alerts,currently';
        const api_url =`https://api.darksky.net/forecast/2dcd0120d4db2f169cf0ca7fe725803e/42.3601,-71.0589`;
        const fetch_response = await fetch(api_url);    
        const json = fetch_response.json();
        console.log(json); 
    } catch(error){
        console.log(error);
    }
  
};