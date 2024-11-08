const jwt = require("jsonwebtoken");
const { ObjectID } = require("mongodb");

const { mongoose, secret } = require("../app/config/");
const { Chef } = require("../models/chef");
const { Customer } = require("../models/customer");

signToken = (user) => {
  return jwt.sign(
    {
      iss: "Food Around",
      sub: user._id,
      iat: new Date().getDate(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    secret
  );
};

//cehck if email registered as Chef or Customer
findDuplicate = async (email) => {
    console.log('finding dups');
  var chef = await Chef.findOne({ email });
  console.log(chef);
  var cust = await Customer.findOne({ email });
  console.log(cust);
  if (cust || chef) {
    return true;
  }
  return false;
};

module.exports = {
  //callback function for signing in the user and sending user data plus token
  //called by /signIn route on successful authentication and validation
  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res
      .status(200)
      .send({
        token,
        user: req.user,
        lat: req.user.address.coordinates[0],
        lng: req.user.address.coordinates[1],
      });
  },

  signUp: async (req, res, next) => {
    var newUser;
    const {
      name,
      email,
      password,
      lat,
      lng,
      phone,
      featured,
      specialities,
      minOrder,
      deliveryTime,
    } = req.validated.body;
    if (req.validated.body.role === "chef") {
      if (await findDuplicate(email)) {
        return res.status(404).send({ message: "Email already exists" });
      } else {
        newUser = new Chef({
          name,
          email,
          password,
          address: {
            type: "Point",
            coordinates: [lat, lng],
          },
          phone,
          featured,
          specialities,
          minOrder,
          deliveryTime,
        });
      }
    } else if (req.validated.body.role === "customer") {
      if (await findDuplicate(email)) {
        return res
          .status(200)
          .send({ exists: true, message: "Email already exists" });
      } else {
        newUser = new Customer({
          name,
          password,
          email,
          address: {
            type: "Point",
            coordinates: [lat, lng],
          },
          phone,
        });
      }
    }
    await newUser
      .save()
      .then((user) => {
        const token = signToken(user);
        res.status(200).send({ token, user, lat, lng });
      })
      .catch((err) => {
        res
          .status(400)
          .send({ message: "Error processing signup request", err });
      });

    //move on to next function
    return next();
  },

  findById: async (req, res, next) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
      return res
        .status(400)
        .send({ message: "User ID not valid", params: req.params });
    }

    //first check the Chefs Collection, if available, send response, if not, we'll get
    //false inside user variable and we'll query the customers collection instead

    const user = await Chef.findById(id)
      .then((chef) => {
        if (!chef) {
          return false;
        }
        //if chef is found, respond..
        return res.status(200).send(chef);
      })
      .catch((err) => {
        res.status(400).send({ message: "Error getting info" });
      });

    //this code will execute ONLY if the id isn't found in Chefs Collection
    if (!user) {
      await Customer.findById(id)
        .then((customer) => {
          if (!customer) {
            return res.status(404).send({ message: "No User found" });
          }
          //return customer;
          res.status(200).send(customer);
        })
        .catch((err) => {
          res
            .status(400)
            .send({ message: "error while fetching cust", error: err });
        });
    }

    return next();
  },

  //function for checking email only in DB, used during login/signup,
  //if email is found, user is asked to enter pass and be logged in,
  //if no email is founf, user is taken to the signup activity

  findByEmail: async (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    console.log(email);
    // if(!ObjectID.isValid(id)) {
    //     return res.status(400).send({message: "User ID not valid", params: req.params});
    // }

    //first check the Chefs Collection, if available, send true, if not found,
    //query the customers collection instead
    let user = await Chef.findOne({ email }).then((chef) => {
      console.log(!chef);
      if (!chef) {
        return null;
      }
      //if chef is found, respond..
      return res.status(200).send({ userExists: "yes", role: "chef" });
    });

    //this code will execute ONLY if the id isn't found in Chefs Collection
    if (!user) {
      await Customer.findOne({ email })
        .then((customer) => {
          if (!customer) {
            return res.status(200).send({ userExists: "no" });
          }
          //return customer;
          res.status(200).send({ userExists: "yes", role: "customer" });
        })
        .catch((err) => {
          res
            .status(400)
            .send({ message: "error while fetching cust", error: err });
        });
    }

    return next();
  },
};
