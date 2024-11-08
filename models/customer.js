const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

//create a customer schema

const customerSchema = new Schema ({

        name: {type: String, required: true, default: "Amazing Foodie"},
    
        email: {type: String, required: true, unique: true, lowercase: true},
    
        password: {type: String, required: true},

        address: {
            type: {type: String},
            coordinates: [Number]
        },

        phone: {
                type:  String,
                required: true    
        },
        image: {
            type: String,
            required: false
        },
        favoriteFood: {
            type: [Schema.ObjectId],
            ref: "Food"
        },

        favoriteChef: {
            type: [Schema.ObjectId],
            ref: "Chef"
        },
        
        role: {type: String, default: "customer"}
});

//hash passwords before saving..
customerSchema.pre('save',  function (next) {
     //generate a salt for hashing
     //console.log('Reached here..');
    const salt =  bcrypt.genSaltSync(10);
    //console.log('Generated Salt..');
    const hash = bcrypt.hashSync(this.password, salt);
    //.then( (hash) => {
      //  console.log('hashed password..');
     //replace password with a hashed password
     this.password = hash;
     //console.log('replaced with hash..');
     //proceed
     next();

    // }).catch( (err) => {
    //      next(err);
    // });
});


customerSchema.methods.isCorrect =  async function (pass) {
    try {
       console.log('checking pass');

       return await bcrypt.compareSync(pass, this.password);
       
    }
    catch(err) {
        throw new Error(err);    
    }
}

customerSchema.index({"address" : "2dsphere"});


//customer model

var Customer = mongoose.model("Customer", customerSchema);

//export model

module.exports = {Customer};