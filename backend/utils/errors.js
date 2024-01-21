const constants = require('./constants.json');

class BaseError extends Error {
  constructor(
    description,
    statusCode,
    isOperational,
    errorStack,
    logingErrorResponse,
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    // this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
    Error.captureStackTrace(this);
  }
}

class ResourceError extends BaseError {
  constructor(
    description = 'Internal Server Error',
    statusCode = constants.STATUS_CODES.INTERNAL_ERROR,
    isOperational = true,
  ) {
    super(description, statusCode, isOperational);
  }
}

module.exports = {
  BaseError,
  ResourceError,
};
