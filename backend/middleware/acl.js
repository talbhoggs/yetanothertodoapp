const { verifyAccess } = require('../utils');

const acl = (...roles) =>
// (...roles) means that this function accepts n number of parameter

// callback
  (req, res, next) => {
    try {
      verifyAccess(req, roles);
      next();
    } catch (err) {
      next(err);
    }
  };
module.exports = acl;
