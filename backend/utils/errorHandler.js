const getLogger = require('./logger');

const logger = getLogger(module);
const errorHandler = (error, req, res, next) => {
  process.on('unhandledRejection', (reason, promise) => {
    logger.error(reason, 'UNHANDLED ERROR');
    throw reason;
  });

  process.on('uncaughtException', (error) => {
    if (!error.isOperational) {
      logger.error(`Terminating Todo Application`);
      logger.error(error)
      process.exit(1);
    }
  });

  if (!error.isOperational) {
    logger.error(`Terminating Todo Application`);
    logger.error(error)
    process.exit(1);
    //next(error);
  } else {
  // handle error
    return res.status(error.statusCode).json({
      successful: false, status: error.statusCode || 500, message: error.message, data: error.data,
    });
  }
};

module.exports = errorHandler;
