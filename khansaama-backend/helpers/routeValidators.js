const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            //variable for storing body of request against the schema
            var result = Joi.validate(req.body, schema)
            
            //if err then send back the error
            if(result.error) {
                return res.status(200).send({ status: "Unsuccessful", error:`${result.error}`, req:`${req}`});
            }
            
            //if no err then attach the verified req.body as req.validated.body which
            //is the validated req.body sent as req.validated.body
            if(!req.validated) {
                req.validated = {};
            }

            //set req.value.body to result.value which is validated req.body
            req.validated['body'] = result.value;

            //move on to next function inside the controller
            next();
        }

    },
    schemas: {
    
        signUpSchema: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            lat: Joi.number(),
            lng: Joi.number(),
            description: Joi.string(),
            image: Joi.string(),
            specialities: Joi.string(),
            minOrder: Joi.number(),
            deliveryTime: Joi.number(),
            phone: Joi.string().required(),
            role: Joi.string().required(),
            featured: Joi.bool()
        }),

        signInSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}