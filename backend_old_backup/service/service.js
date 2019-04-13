var logger = require('../core/logger');

/* Service basicaly manages runner. 
* It contains runner object, handles starting/stoping/restarting 
* git checkout, etc... */
const status = {
  /* Sevice just created. Nothig has actually been done yet */
  NOT_INITIALIZED: 0,
  
  /* Service has started process of initialization. Creating folders, users and stuff */
  INITIALIZED: 1,

  /* Source pull is in progress */
  PULLING_PROJECT: 2,

  /* Building docker images and stuff */
  BUILDING_IMAGE: 3,

  /* Everything is ready. Service can be started. */
  READY: 4,

  /* Service is currently running */
  RUNNING: 5
}

function construct(id, user, github) {
  this.id = id;
  this.runner = null;
  this.user = user;
  this.status = status.NOT_INITIALIZED;
  this.github = github;

  /* Initialize service with runner */
  this.initialize = function(runner) {
    this.runner = runner;
    /* TODO: Create folders, set permissions, start checkout */
    this.checkout();
    this.status = status.INITIALIZED;
  }

  this.checkout = function() {
    this.status = status.PULLING_PROJECT;
    /* TODO: Pull project form git. Git credidentals stored in this.user 
     * After checkout, build (or rebuild) image */
    this.buildImage();
  }

  this.buildImage = function() {
    this.status = status.BUILDING_IMAGE;
    /* TODO: Build actual docker image for runner */
    this.status = status.READY;
  }

  this.run = function() {
    if (this.status != status.READY) {
      throw "Could not run service. Status must be 'READY' before service could be started.";
    }
    /* TODO: Start service here */
  }
}


module.exports = {};
module.exports.construct = construct;
module.exports.status = enumStatus;