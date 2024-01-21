const constants = require('../utils/constants.json');
const prod = require('./prod.json');
const dev = require('./dev.json');

let configuration = '';
const environment = process.env.NODE_ENV;
if (environment === constants.ENV.PROD) {
  configuration = prod;
} else {
  configuration = dev;
}

module.exports = configuration;
