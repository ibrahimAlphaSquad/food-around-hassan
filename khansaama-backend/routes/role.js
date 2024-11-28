const express = require('express');
const router = require('express-promise-router')();

const roleController = require('../controllers/role');

router.route('/chefs')
    .get(roleController.allChefs);

router.route('/customers')
    .get(roleController.allCustomers);

module.exports = {router};