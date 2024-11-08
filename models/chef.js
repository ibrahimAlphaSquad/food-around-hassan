const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//create a chef schema
const chefSchema = new Schema({
  name: { type: String, required: true, default: "Amazing Chef" },

  kitchenName: { type: String, required: false },

  email: { type: String, required: true, unique: true, lowercase: true },

  password: { type: String, required: true },

  address: {
    type: { type: String },
    coordinates: [Number],
  },

  phone: { type: String, required: true },

  description: { type: String, default: "This Kitchen has no description." },
  image: {
    type: String,
    required: false,
    default: "",
  },
  featured: { type: Boolean, default: false },

  role: { type: String, default: "chef" },

  specialities: { type: String, default: "" },

  dishes: { type: Schema.ObjectId, ref: "Food" },

  minOrder: { type: Number, default: 0.0, required: true },

  deliveryTime: { type: Number, default: 1.5, required: true },

  rating: { type: Number, required: false, default: 0.0 },
});

//hash passwords

chefSchema.pre("save", async function (next) {
  //generate a salt for hashing
  const salt = await bcrypt.genSalt(10);
  await bcrypt
    .hash(this.password, salt)
    .then((hash) => {
      //replace password with a hashed password
      this.password = hash;
      //proceed
      next();
    })
    .catch((err) => {
      next(err);
    });
});

chefSchema.methods.isCorrect = async function (pass) {
  try {
    console.log("checking pass");
    return await bcrypt.compareSync(pass, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

chefSchema.index({ address: "2dsphere" });

//chef model

var Chef = mongoose.model("Chef", chefSchema);

//export model

module.exports = { Chef };
