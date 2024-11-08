const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConfig = require('../app/config/passport');
const mapsController = require('../controllers/maps');
const {validateBody, schemas} = require('../helpers/routeValidators');

const signInAuth = passport.authenticate('local', {session: false, failureFlash: true});
const jwtAuth = passport.authenticate('jwt', {session: false});

router.route('/')
    .post( mapsController.nearby);

module.exports = {router};