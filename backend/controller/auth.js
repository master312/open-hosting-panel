/**
 * Contoller used for exposing public user functions. Like login, register and forgot password. 
 */
const { logger } = require('../utils')
const service = require('../service').auth
const exception = require('../exception')

const util = require('util')

const login = async(req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      throw new exception.badRequest("Username and password are required");
    }
    var session = await service.authenticateByCredidentals(req.body.username, req.body.password)
    res.status(200)
    res.send({
      accessToken: session.token,
      timeout: Math.round(session.timeLeft() / 1000)
    })
    next()
  } catch(error) {
    next(error)
  }
}

const logout = async(req, res, next) => {
  /* TODO... */
}

const register = async(req, res, next) => {
  res.status(400)
  res.send("User registration unavailable!")
}

module.exports = {
  login,
  logout,
  register
}