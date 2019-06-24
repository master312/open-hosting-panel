/**
 * Extends express router with authentication functionality
 */
const express = require('express')
const auth = require('./service/auth')

module.exports = function() {
  var router = express.Router()

  /**
   * Speceft path that will require user to be authenticated.
   * If @path is left undefined (null), every path on this router will be secure
   */
  router.secure = function(path) {
    if (path) {
      router.use(path, auth.authMidlewareHandler);
    } else {
      router.use(auth.authMidlewareHandler);
    }
  }
  return router;
}