
module.exports = function(message) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'The requested resource couldn\'t be found';
  this.statusCode = 404;
}