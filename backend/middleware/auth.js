const { validateSigniture } = require('../utils');

const verifyToken = (req, res, next) => {
  try {
    validateSigniture(req);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
