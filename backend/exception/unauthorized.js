
module.exports = function(message) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'Unauthorized access';
  this.statusCode = 401;
}