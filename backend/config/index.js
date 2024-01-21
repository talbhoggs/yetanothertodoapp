const constants = require('../utils/constants.json');

let configuration = '';
const environment = process.env.NODE_ENV;
if (environment === constants.ENV.PROD) {
  configuration = require('./prod.json');
} else {
  configuration = require('./dev.json');
}

module.exports = configuration;
