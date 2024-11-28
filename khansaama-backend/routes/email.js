const express = require('express');
const router = require('express-promise-router')();

const userController = require('../controllers/user');

router.route('/')
    .post(userController.findByEmail);
module.exports = {router}