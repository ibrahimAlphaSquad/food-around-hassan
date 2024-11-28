const express = require('express');
const router = require('express-promise-router')();

const searchController = require('../controllers/search');

router.route('/chef/:query')
    .get(searchController.searchChef);

router.route('/food/:query')
    .get(searchController.searchFood);

module.exports ={router};