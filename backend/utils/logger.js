const { format, createLogger, transports } = require('winston');
const config = require('../config');

const {
  combine, timestamp, label, printf, colorize, json,
} = format;

const loggerOptions = {
  level: config.LOGGER.LEVEL || 'info',
  silent: Boolean(config.LOGGER.SILENT) || false,
  json: Boolean(config.LOGGER.JSON) || false,
  appName: config.APP_NAME || '',
};

const myFormat = printf(({
  level, message, label, timestamp, ...rest
}) => `${timestamp} [${label}] ${level}: ${message} ${JSON.stringify(rest)}`);

function getLoggerFormats() {
  const formats = [
    label({ label: loggerOptions.appName }),
    timestamp(),
    // redact()
  ];
  if (loggerOptions.json) {
    formats.push(json());
  } else {
    formats.push(colorize(), myFormat);
  }
  return formats;
}

const transport = {
  console: new transports.Console(),
};

const logger = createLogger({
  level: loggerOptions.level,
  silent: loggerOptions.silent,
  format: combine(...getLoggerFormats()),
  transports: [transport.console],
});

const getLogger = (module, metadata = {}) => {
  const filename = module.filename.split('/').slice(-2).join('/');
  return logger.child({
    filename,
    ...metadata,
  });
};

module.exports = getLogger;
