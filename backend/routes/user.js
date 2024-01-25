const express = require('express');
const config = require('../config')
const router = express.Router();

const {signUp, getAllUsers} = require('../controller/userController');
const BASE_URI = `/${config.APP_NAME}/${config.API_VERSION}/${config.API_BASE}`
console.log(BASE_URI)
router.post(`${BASE_URI}/signup`, signUp);
router.get(`${BASE_URI}/users`, getAllUsers)

module.exports = router;
