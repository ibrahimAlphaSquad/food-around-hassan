const {Chef} = require('../models/chef');
const {Food} = require('../models/food');

module.exports = {

    featuredFood: async (req, res, next) => {
        let chefName = "";
        featuredFood = await Food.find({featured: 1})

        // featuredFood.foreach(async item => {
        //     await Chef.findById(item.chef)
        //         .then(chef => {
        //             chefName = chef.name;
        //         });
        // });
        res.status(200).send({food: featuredFood, chefName});
    },

    featuredChefs: async (req, res, next) => {
        res.status(200).send(await Chef.find({featured: 1}));
    }
}