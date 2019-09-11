const fetch = require('node-fetch');

const redis = require('redis');
const client = redis.createClient();

exports.setStartLocations =(req, res, next)=>{
    const array = [
        {'id': 'CITY_STGO','lat':-29.645, 'lon':-72.125,  'city': 'SANTIAGO (CL)'},        
        {'id':'CITY_ZU', 'lat':-29.647, 'lon':-72.125,  'city': 'Zurich (CH)'},        
        {'id':'CITY_AU', 'lat':-29.648, 'lon':-72.125,  'city': 'Auckland (NZ)'},        
        {'id':'CITY_SY', 'lat':-29.6455, 'lon':-72.125,  'city': 'Sydney (AU)'},        
        {'id':'CITY_LON', 'lat':-29.64, 'lon':-72.125,  'city': 'Londres (UK)'},        
        {'id':'CITY_GEO', 'lat':-29.65, 'lon':-72.125,  'city': 'Georgia (USA)'}
    ];
    let countErr = 0 ;
    array.forEach(element => {
          client.hmset(
            element.id, element    
            , (err, reply) =>{     
                if (err){
                    countErr++;
                }           
                console.log(reply);
            }
        );   
    });
    if (countErr ===0){
        res.status(201).json({
            message:'Done'
        });
    }else{
        res.json({
            'error ': error
        });
    }
};

exports.getKey =(req,res, next) =>{
    try{
        client.KEYS('CITY_*',(err, reply)=>{
            res.json({
                'data': reply
            });  
        }); 
    }
    catch(error){

    }
};

exports.getLocations = async(req, res, next )=>{  
    try{        
        const location = req.params.location;
        if (location ===undefined){                        
            res.json({
                'error': 'localizacion no encontrada'
            }); 
        }else{
            client.HGETALL(location,(err, reply)=>{
                res.json({
                    'data': reply
                });  
            }); 
        }  
    }
    catch(error){
        console.log(error);
        res.json({
            'error': error
        }); 
    }       
};



exports.postDirections = (req, res, next) =>{
    try{
        const key  = req.body.key;
        const lat  = req.body.latitude;
        const lon = req.body.longitude;
        const time  = req.body.timezone; 
        const post = { 
            key : key,
            latitude: lat,  
            longitude: lon, 
            timezone: time
        };
        console.log(post.key);
        client.HMSET (
            post.key , {'lat' : post.latitude, 'lon':  post.longitude  } , (err, reply) =>{
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