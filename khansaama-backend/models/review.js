const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    foodRated: {
        type: Schema.ObjectId,
        ref: "Food",
        required: true
    },
    reviewText: {
        type: String,
        required: false
    },
    reviewStars: {
        type: Number,
        required: false
    }

});

var Review = mongoose.model("Review", reviewSchema);

module.exports = {Review}