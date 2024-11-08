const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a food schema

var foodSchema = new Schema ({

        name: {
            type: String,
            required: true,
            default: "Delicious Item"

        },

        description: {
            type: String,
            required: true,
            default: "This item has no description."
        },

        price: {
            type: Number,
            required: false,
            default: 0
        },

        chef: {
            type: Schema.ObjectId,
            ref: "Chef"
        },

        chefName: {
            type: String,
            required: true
        },

        featured: {
            type: Boolean,
            default: false
        },
        
        image: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            default: 0
        }

});

//food model

var Food = mongoose.model("Food", foodSchema);

//export model

module.exports = {Food};