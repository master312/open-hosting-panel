
var logger = {
  /* Default log level */
  DEBUG: 0,
  /* Informative logs */
  INFO: 1,
  /* Warning logs, that might be hacking aptemts, or potentional bug, etc... */
  WARNING: 2,
  /* Non-fatal error, coused by user */
  EXCEPTION: 3,
  /* Error that will potentionally crush server */
  ERROR: 4
};

var loggerLevelText = { };
loggerLevelText[logger.DEBUG] = "DEBUG";
loggerLevelText[logger.INFO] = "INFO";
loggerLevelText[logger.WARNING] = "WARNING";
loggerLevelText[logger.EXCEPTION] = "EXCEPTION";
loggerLevelText[logger.ERROR] = "ERROR";

logger.log = function(message, type) {
  if (type == null) {
    type = logger.DEBUG;
  }
  var msg = loggerLevelText[type] + ": " + message;

  if (type == logger.EXCEPTION) {
    console.error(msg);
  } else {
    console.log(msg);
  }
}

module.exports = logger;