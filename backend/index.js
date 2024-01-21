require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./utils/errorHandler');
const config = require('./config');
const dbConnection = require('./utils/databaseConnection');
const getLogger = require('./utils/logger');
const routes = require('./routes');

const logger = getLogger(module);
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

dbConnection();

app.use(routes);

app.use(errorHandler);

// catch all request
app.all('*', (req, res) => {
  res.status(404).json({ error: '404 Not Found', timestamp: Date.now(), status: 400 });
});

const PORT = config.PORT || 3500;

mongoose.connection.once('open', () => {
  logger.info('Mongo DB is up!');
  logger.info(`readyState ${mongoose.connection.readyState}`);
  app.listen(PORT, () => logger.info(`Express running at ${PORT}`));
});
