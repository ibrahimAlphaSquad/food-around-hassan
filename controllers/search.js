const { Chef } = require("../models/chef");
const { Food } = require("../models/food");

module.exports = {
  searchChef: async (req, res, next) => {
    console.log(`search req.params: ${req.params.search}`);
    const chefs = await Chef.find({
      name: { $regex: req.params.query, $options: "i" },
    });
    if (chefs.length < 1) {
      return res.status(404).send({ message: "No Chef Found" });
    }
    res.status(200).send(chefs);
    //console.log(chefs);
    return next();
  },

  searchFood: async (req, res, next) => {
    //console.log(`search req.params: ${req.params.query}`);
    const food = await Food.find({
      $or: [
        { name: { $regex: req.params.query, $options: "i" } },
        { description: { $regex: req.params.query, $options: "i" } },
      ],
    });
    if (food.length < 1) {
      return res.status(404).send({ message: "No items Found" });
    }
    res.status(200).send(food);
    //console.log(chefs);
    return next();
  },
};
