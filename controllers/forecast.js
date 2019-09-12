const fetch = require('node-fetch');

const redis = require('redis');
const client = redis.createClient();

exports.postSetStartLocations =(req, res, next)=>{
    const array = [
        {'id': 'CITY_STGO','lat':-33.4377968, 'lon':-70.6504451,  'city': 'SANTIAGO (CL)', 'temp': '', 'hour':''},        
        {'id':'CITY_ZU', 'lat':47.4133024, 'lon':8.656394,  'city': 'Zurich (CH)', 'temp': '', 'hour':''},        
        {'id':'CITY_AU', 'lat':-36.5412811, 'lon':174.35096741,  'city': 'Auckland (NZ)', 'temp': '', 'hour':''},        
        {'id':'CITY_SY', 'lat':-33.8548157, 'lon':151.2164539,  'city': 'Sydney (AU)', 'temp': '', 'hour':''},        
        {'id':'CITY_LON', 'lat':51.4893335, 'lon':-0.14405508,  'city': 'Londres (UK)', 'temp': '', 'hour':''},        
        {'id':'CITY_GEO', 'lat':32.3293809, 'lon':-83.1137366,  'city': 'Georgia (USA)', 'temp': '', 'hour':''}
    ];
    let countErr = 0 ;
    array.forEach(element => {
          client.hmset(
            element.id, element    
            , (err, reply) =>{     
                if (err){
                    countErr++;
                }           
                //console.log(reply);
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
        res.json({
            'error ': error
        });
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
        const temp = req.body.temp;
        const hour = req.body.hour; 
        const post = { 
            key : key,
            latitude: lat,  
            longitude: lon, 
            timezone: time,
            temp : temp,
            hour : hour
        };
        client.HMSET (
            post.key , {
                            'lat' : post.latitude, 
                            'lon':  post.longitude, 
                            'temp': post.temp, 
                            'hour': post.hour  
                        }, 
                (err, reply) =>{
                res.status(201).json({
                    message:'Done',reply
                });
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

exports.postSaveError =(req, res, next) =>{
    try{
        const error  =req.body.error;
        client.HMSET (
            'api.errors' , {
                            'timestamp' : Date.now(), 
                            'contenido':  error.error
                        }, 
                (err, reply) =>{
                res.status(201).json({
                    message:'Done',reply
                });
            }
        );
    }
    catch(error){
        res.json({
            'error ': error
        });
    }
};

