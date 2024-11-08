const { Chef } = require("../models/chef");
const { Customer } = require("../models/customer");

module.exports = {
  allChefs: async (req, res, next) => {
    //console.log(`find by role req.params: ${req.params}`);
    await Chef.find({})
      .then((chefs) => {
        if (chefs.length < 1) {
          res.status(404).send({ message: "No Chefs Found" });
        }
        res.status(200).send(chefs);
      })
      .catch((err) => {
        res
          .status(400)
          .send({ message: "There was an error processing your request", err });
      });

    return next();
  },

  allCustomers: async (req, res, next) => {
    await Customer.find({})
      .then((customers) => {
        if (customers.length < 1) {
          res.status(404).send({ message: "No Chefs Found" });
        }
        res.status(200).send(customers);
      })
      .catch((err) => {
        res
          .status(400)
          .send({ message: "There was an error processing your request", err });
      });

    return next();
  },
};
