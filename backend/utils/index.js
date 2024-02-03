const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const getLogger = require('./logger');

const logger = getLogger(module);

const { ResourceError } = require('./errors');

const hashPassword = (password) => bcrypt.hashSync(password, Number(process.env.SALT));
// validPassword

const validatePassword = (enteredPassword, savedPassword) => bcrypt.compareSync(enteredPassword, savedPassword);
// generateToken

const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: config.ACCESS_TOKEN_EXPIRY });
  } catch (err) {
    return err;
  }
};

// generateRefreshToken
const generateRefreshToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: config.REFRESH_TOKEN_EXPIRY });
  } catch (err) {
    return err;
  }
};

const validateSigniture = (req) => {
  try {
    let token = req.header('Authorization');
    token = token.slice(7, token.length).trimLeft();
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.userInfo = decodedToken.userInfo;
  } catch (err) {
    logger.warn(err);
    throw new ResourceError('Access denied', 401);
  }
};

const verifyAccess = (req, roles) => {
  const valid = req.userInfo.roles.some((role) => roles.includes(role));
  if (!valid) throw new ResourceError('Forbidden', 403);
};
module.exports = {
  hashPassword, validatePassword, generateToken, generateRefreshToken, validateSigniture, verifyAccess,
};
