const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConfig = require('../app/config/passport');
const userController = require('../controllers/user');
const {validateBody, schemas} = require('../helpers/routeValidators');

const signInAuth = passport.authenticate('local', {session: false});
const jwtAuth = passport.authenticate('jwt', {session: false});

//sign-in
router.route('/signIn')
    .post(validateBody(schemas.signInSchema), signInAuth, userController.signIn);


//sign-up route for both chef and customer
router.route('/signUp')
    .post(validateBody(schemas.signUpSchema) , userController.signUp);

//find a user by its id, adding /:role because we have different collections
//of users. so we will query the DB based on the role sent in req.params
router.route('/id/:id')
    .get(userController.findById);


module.exports = {router};