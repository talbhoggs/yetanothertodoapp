const getLogger = require('./logger');
const { BaseError } = require('./errors');

const logger = getLogger(module);

const trustedError = (error) => {
  if (error instanceof BaseError) {
    logger.warn(error);
    return error.isOperational;
  }
  if (error instanceof SyntaxError) {
    logger.warn(error);
    return true;
  }

  return false;
};

const errorHandler = (error, req, res, next) => {
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(reason, 'UNHANDLED ERROR');
    throw reason;
  });

  process.on('uncaughtException', (error) => {
    if (!trustedError(error)) {
      logger.error('Terminating Todo Application');
      logger.error(error);
      process.exit(1);
    }
  });

  if (!trustedError(error)) {
    logger.error('Terminating Todo Application');
    logger.error(error);
    process.exit(1);
    // next(error);
  }
  // handle error
  return res.status(error.statusCode).json({
    successful: false, status: error.statusCode || 500, message: error.message, data: error.data,
  });
};

module.exports = errorHandler;
