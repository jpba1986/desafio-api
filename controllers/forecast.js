const fetch = require('node-fetch');

const redis = require('redis');
const client = redis.createClient();


exports.setStartLocations =(req, res, next)=>{
    const array = [
        {'lat':-29.645, 'lon':-72.125,  'city': 'SANTIAGO (CL)'},        
        {'lat':-29.647, 'lon':-72.125,  'city': 'Zurich (CH)'},        
        {'lat':-29.648, 'lon':-72.125,  'city': 'Auckland (NZ)'},        
        {'lat':-29.6455, 'lon':-72.125,  'city': 'Sydney (AU)'},        
        {'lat':-29.64, 'lon':-72.125,  'city': 'Londres (UK)'},        
        {'lat':-29.65, 'lon':-72.125,  'city': 'Georgia (USA)'}
    ];
    console.log(array);
    array.forEach(element => {
      
        client.hmset(
            'locations', element    
            , (err, reply) =>{
                res.status(201).json({
                    message:'Done',array
                });
                console.log(reply);
            }
        ); 
    });
};

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
    try{
        const lat  = req.body.latitude;
        const lon = req.body.longitude;
        const time  = req.body.timezone; 
        const post = { 
            latitude: lat,  
            longitude: lon, 
            timezone: time
        };
    
        client.hmset(
            'directions', post, (err, reply) =>{
                res.status(201).json({
                    message:'Done',post
                });
                console.log(reply);
            }
        );
    }
    catch(error){
        res.json({
            'error ': error
        });

    }

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