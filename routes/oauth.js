const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

//Google OAuth
router.route('/google')
    .post(passport.authenticate('googleToken', {session: false}));

    module.exports = {router};