const express = require('express');
const router = express.Router();

const healthController = require('./health');
const userController = require('./user')
router.use(healthController);
router.use(userController);

module.exports = router;
