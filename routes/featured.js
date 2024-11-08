const express = require('express');
const router = require('express-promise-router')();

const featuredController = require('../controllers/featured');

router.route('/food')
    .get(featuredController.featuredFood);

router.route('/chefs')
    .get(featuredController.featuredChefs);

module.exports = {router}