var logger = require('../core/logger')

/* Base object for every runner */
module.exports = function(name, version) {
  this.name = name;
  this.version = version;
  this.config = null;  
  
  /* Function that initalizes runner, and sets initial configuration */
  this.initialize = function() { logger.log("Initialize function not implemented!", logger.ERROR) };
  /* Function starts runner */
  this.start = function() { logger.log("Start function not implemented!", logger.ERROR) };
  /* Function stops runner */
  this.stop = function() { logger.log("Stop function not implemented!", logger.ERROR) };
  /* Function that shoud return state of this runner.
   * Should be stateless method, independent of database, and other in-memory shit.
   * EX: For NodeJS service it should check if PID is alredy running or something */
  this.getStatus = function() { return this.status.NONE; };

  this.status = {
    NONE: 0,
    STOPED: 1,
    STARTING: 2,
    RUNNING: 3,
    ERROR: 4
  }
}