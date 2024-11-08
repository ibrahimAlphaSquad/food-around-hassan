const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConfig = require('../app/config/passport');
const ordersController = require('../controllers/orders');

const signInAuth = passport.authenticate('local', {session: false});
const jwtAuth = passport.authenticate('jwt', {session: false});

//place an order
router.route('/place')
.post(ordersController.placeOrder);

//retrieves all ongoing orders, for chef or customers
router.route('/get/incomplete')
.post(jwtAuth, ordersController.getIncomplete);

//retrieves all ongoing orders, for chef or customers
router.route('/get/all')
.post(ordersController.getAll);

router.route('/get/:id')
.get(ordersController.getById);
// //cancels an ongoing order
// router.route('/cancel')
// .post(jwtAuth, ordersController.cancelOrder);

module.exports = {router};