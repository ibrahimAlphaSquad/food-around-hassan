const {mongoose, ObjectID} = require('../app/config/');
const {Food} = require('../models/food');
const {Review} = require('../models/review');
const {Chef} = require('../models/chef');
const {Customer} = require('../models/customer');

module.exports = {
    add: async (req, res, next) => {
         if(req.user.role==='customer') {
             return res.status(403).send({message: 'You are not allowed to add food'});
         }
         var chefName;
         const userId = req.user._id;
         await Chef.findById(userId)
                .then(chef => {
                    chefName = chef.name;
                });
         const allFood = Food.find({chef: ObjectID(`${userId}`)});
        var newFood;
        const {name, image, description, price, chef, featured} = req.body;
        console.log(chefName);
        newFood = new Food({
            name,
            image,
            description,
            price,  
            chef : userId,
            chefName: chefName,
            featured : false

        });

        await newFood.save().then((foodItem) =>{
            res.status(200).send(foodItem);
        }).catch((err) => {
           res.status(200).send({error: "Error occurred while saving. Please try again.", err});
        });
        },

        edit: async (req, res, next) => {
            console.log("Edit Body is ", req.body);
            const update = await Food.findOneAndUpdate(
              { _id: req.body.updates.foodId },
              req.body.updates
            ).then((result) => {
              console.log("Updated Content is ", result);
              if (!result)
                return res
                  .status(404)
                  .send({ error: "Item not found.", itemId: req.body.foodId });
              return res.status(200).send({ updatedItem: result });
            });
          },
        
          delete: async (req, res, next) => {
            console.log("Delete Body is ", req.body);
            await Food.deleteOne({ _id: req.body.foodId }).then((result) => {
              result = JSON.parse(result);
              if (!new Boolean(result.n))
                return res.status(404).send({
                  success: new Boolean(result.ok),
                  error: "Item not found.",
                  itemId: req.body.foodId,
                });
        
              return res.status(200).send({
                success: new Boolean(result.ok),
                itemDeleted: req.body.foodId,
              });
            });
          },

    findAll: async (req, res, next) => {
        var food = Food.find({});
        await food.then((food) => {
            res.status(200).send(food);
        }).catch((err) => {
            res.status(400).send(err);
        });
        },

    findById: async (req, res, next) => {
        var foodId = req.params.id;
        //console.log(ObjectID);
        if(!ObjectID.isValid(foodId)) {
            return res.status(400).send({message: "ObjectId not Valid"});
        }
        await Food.findOne({_id: foodId}).then((food) => {
            if(!food) {
               return res.status(404).send({message: "Item not found"});
            }
            return res.status(200).send({food})
        });
        },

    findByChef: async (req, res, next) => {
        console.log(req.params);
        
        var chef = req.params.chef;
        if(!ObjectID.isValid(chef)) {
            return res.status(400).send({message: "ChefId not Valid"});
        }

        await Food.find({chef}).then((items) => {
            if(!items) {
                return res.status(404).send({message: "No Items found"});
            }
                return res.status(200).send({items});
            
        });
    },

    rate: async (req, res, next) => {
        let {foodRated, reviewText, reviewStars} = req.body;
        var newReview = new Review({
            foodRated,
            reviewText,
            reviewStars
        });
        await newReview.save()
            .then(review => {
                res.status(200).send(review);
            });
        next();
    },

    getRatings : async (req, res, next) => {
        var foodId = req.body.foodId;
        await Review.find({foodRated: foodId})
            .then((reviews) => {
                res.status(200).send({reviews});
            });
        next();
    },

    getStars : async (req, res, next) => {
        var foodId = req.body.foodId;
        let totalStars = 0;
        var totalReviews;
        await Review.find({foodRated: foodId})
            .then(reviews => {
                totalReviews = reviews;
                for(var i=0; i<reviews.length; i++){
                    totalStars = totalStars + reviews[i].reviewStars;
                }
                totalStars = totalStars/totalReviews.length;
                res.status(200).send(totalStars);
            });
    },

    likeFood: async (req, res, next) => {
            let foodId = req.body.foodId;
            let userId =  req.user._id;
            //console.log(req.user);

            await Customer.find({_id: userId, favoriteFood: foodId})
                    .then( async (likedItems) => {
                        if(!likedItems) {
                            await Customer.updateOne({_id: userId}, {$push: {favoriteFood: foodId}})
                            .then(likedItem => {
                                console.log(likedItem);
                                res.status(200).send(likedItem);
                            });
                        } else {
                            res.send({message: "alreadyLiked"})
                        }
                    }).catch((err) => {
                        res.send(err);
                    });
            
    },

    favorite: async (req, res, next) => {
            let userId = req.user._id;
            
            await Customer.findOne({_id: userId}, {favoriteFood: 1, _id: 0})
            .then( async items => {
                var favorites = items.favoriteFood;
                var favoriteItems =[];
                for (var i = 0; i<favorites.length; i++){
                   await Food.findOne({_id: favorites[i]})
                        .then(item => {
                            favoriteItems.push(item);
                        });      
                }
                return res.status(200).send(favoriteItems); 
                
                  
            });
    }

}