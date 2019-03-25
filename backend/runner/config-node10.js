/* Configuration for NodeJS 10 */

module.exports = function() {
  /* Enviroment variables */
  this.envVars = [];

  /* App listen port */
  this.port = -1;

  this.descriptors = {
    "envVars": "Enviroment variables to be set to NodeJS.",
    "port": "Port on which your NodeJS app listens for requests."
  }
}