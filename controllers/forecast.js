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