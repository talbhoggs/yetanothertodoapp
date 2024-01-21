const mongoose = require('mongoose');
const config = require('../config');
const getLogger = require('./logger');

const logger = getLogger(module);
const connectDB = async () => {
  try {
    logger.info('connecting to Mongo DB!');
    await mongoose.connect(config.DATABASE_URI);
  } catch (err) {
    logger.error('Failed to start Mongodb');
    logger.error(err);
  }
};

module.exports = connectDB;
