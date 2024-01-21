const mongoose = require('mongoose');
const { ResourceError } = require('../utils/errors');

const health = async (req, res, next) => {
  try {
    if (!mongoose.connection.readyState === 1) {
      throw new ResourceError(`Application error: cannot connect to database instance : statue ${mongoose.connection.readyState}`, 500);
    }

    return res.status(200).json({ successful: true, status: 200, message: 'ok' });
  } catch (err) {
    next(err);
  }
};

module.exports = health;

/*

// router
app.get('/', (req, res, next) => {
  try {
    const valid = false;

    if (!valid) {
      const error = new Error('Validation Error');
      error.statusCode = 400;
      error.data = ['FirstName is required', 'LastName is required'];
      error.isOperational = true;
      throw error;
    }

    return res.status(200).json({ message: 'ok' });
  } catch (err) {
    next(err);
  }
});
*/
