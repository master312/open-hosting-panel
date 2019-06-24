const badRequest = require('./bad_request')
const forbidden = require('./forbidden')
const notFound = require('./not_found')
const unauthorized = require('./unauthorized')

module.exports = {
  badRequest,
  forbidden,
  notFound,
  unauthorized
}