const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const hashPassword = (password) => bcrypt.hashSync(password, Number(process.env.SALT));
// validPassword

const validatePassword = async (enteredPassword, savedPassword) => (await this.hashPassword(enteredPassword, process.env.SALT)) === savedPassword;

// generateToken

const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.ACCES_TOKEN_KEY, { expiresIn: config.ACCESS_TOKEN_EXPIRY });
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

const validateToken = async (req) => {
  try {
    const signature = req.get('Authorization');
    const payload = jwt.verify(signature.split(' ')[1], process.env.ACCES_TOKEN_KEY);
    req.user = payload;
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  hashPassword, validatePassword, generateToken, generateRefreshToken,
};
