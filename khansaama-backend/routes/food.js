const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const multer = require('multer');
var upload = multer({ dest: 'uploads/' })
const passportConfig = require("../app/config/passport");
const foodController = require("../controllers/food");
const { validateBody, schemas } = require("../helpers/routeValidators");

const signInAuth = passport.authenticate("local", { session: false });
const jwtAuth = passport.authenticate("jwt", { session: false });

router.route("/add").post(jwtAuth, upload.array('photos', 12), foodController.add);

//edits a foodItem
// router.route("/edit").post(foodController.edit);
router.route("/edit").post(foodController.edit); //Dev JWT Removed Patch > Post
router.route("/delete").post(foodController.delete); //Dev JWT Removed Delete > Post

//returns all food items from db
// router.route('/find')
//     .get(jwtAuth, foodController.findAll);

//temporary disabled for development env. only
router.route("/find").get(foodController.findAll);
//

//returns food based on id
router.route("/find/:id").get(foodController.findById);

//returns food added by a specific chef
// router.route("/by/:chef").get(jwtAuth, foodController.findByChef);

//Temporary Route for development env. only returns food added by a specific chef
router.route("/by/:chef").get(foodController.findByChef);

router.route("/rate").post(jwtAuth, foodController.rate);

router.route("/getRatings").post(jwtAuth, foodController.getRatings);

router.route("getStars").post(jwtAuth, foodController.getStars);

router.route("/like").post(jwtAuth, foodController.likeFood);

router.route("/favorite").get(jwtAuth, foodController.favorite);
module.exports = { router };
