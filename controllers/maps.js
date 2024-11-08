const {Chef} = require('../models/chef');

module.exports = {
    nearby: async (req, res, next) => {
        console.log(req);
        console.log(req.body.lng);
    
        const nearbyChefs = await Chef.aggregate(
            [
                { "$geoNear": {
                    "near": {
                        "type": "Point",
                        "coordinates": [req.body.lat,req.body.lng]
                    },
                    "distanceField": "distance",
                    "spherical": true,
                    "maxDistance": 10000
                }}
            ],
            function(err,results) {
                if(err) {
                    res.send({err});
                    return;
                }
                res.send({nearby: results});
            }
        )
        
    }
}