
module.exports = function(message) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Forbidden access';
  this.statusCode = 403;
}