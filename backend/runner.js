var logger = require('./core/logger');
var nodeJs10 = require('./runner/runner-node10');

/* Managment class for all runners */
var self = {};

/* Array containing all runner constructor functions (not actual instances) */
self.runners = [];

/* Initialize runners */
self.init = function() {
    self.runners.push(nodeJs10);
    /* Remainder: Push other runners here */
    
    logger.log("Runner manager found " + self.runners.length + " runners available", logger.INFO);
}

/* Gets runner class by name */
self.get = function(name, version) {
    var toReturn = null;
    self.runners.forEach(runner => {
        if (runner.name === name && runner.version === version) {
            toReturn = runner;
            return;
        }
    });
    return toReturn;
}

module.exports = self;
