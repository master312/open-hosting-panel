var logger = require('../core/logger')
var runnerBase = require('./runner')
// var nodeConfig = require("./config-node10")

var name = "NodeJS";
var version = "10.15.3";

function construct(id, config) {
  Object.assign(this, new runnerBase(id, name, version))
  this.config = config;

  this.initialize = function() {
    logger.log("Initializing NodeJS runner");
    /* TODO: Create docker container, setup shit, store container name etc...*/
  }

  this.start = function() {
    logger.log("Starting NodeJS");
    if (!this.validateConfig()) {
      logger.log("Invalid runner config!", logger.EXCEPTION);
    }
  }
  
  this.stop = function() {
    logger.log("Stoping NodeJS");
  }
  
  this.getStatus = function() {
    return 1;
  }

  this.validateConfig = function() {
    return this.config != null && this.config.port > 1000;
  }
}

module.exports = {};
module.exports.name = name;
module.exports.version = version;
module.exports.constructor = construct;