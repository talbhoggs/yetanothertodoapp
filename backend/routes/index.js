const express = require('express');

const router = express.Router();

const healthController = require('./health');

router.use(healthController);

module.exports = router;
