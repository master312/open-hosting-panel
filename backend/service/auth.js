const { logger, generator } = require('../utils')
const userService = require('./user')
const utils = require('util')
const exception = require('../exception')

/**
 * How long can a single user session last (in miliseconds) 
 * User will be logged out after specified amount of time has passed
 * TODO: Move to config
 */
const USER_SESSION_TIMEOUT = 3600 * 1000
const ACCESS_TOKEN_LENGTH = 64

/**
 * Array of all currently active user sessions. Maped by access token
 * TODO: Move session store to database
 * TODO: 'Cron job' to clear expired sessions
 */
var activeSessions = new Map()

/**
 * Used to generate session ID
 */
var sessionIdCounter = 0

/**
 * Represents currently logged in user session
 * @param {user model} user 
 * @param {string} token 
 */
function userSession(user) {
  sessionIdCounter += 1
  this.id = sessionIdCounter
  this.user = user
  this.token = generateAccessToken()
  this.startTime = new Date().getTime()

  this.timeLeft = () => {
    return USER_SESSION_TIMEOUT - (new Date().getTime() - this.startTime)
  }
  
  this.hasExpired = () => {
    return this.timeLeft() <= 0
  }
}

/**
 * Generates unique access token string
 */
function generateAccessToken() {
  var token = ''
  do {
    token = generator.randomString(ACCESS_TOKEN_LENGTH)
    var hasDuplicate = false
    activeSessions.forEach(element => {
      if (element.token === this.token) {
        hasDuplicate = true
      }
    })
    if (!hasDuplicate) {
      break
    }
  } while (true)
  return token
}

/**
 * Creates new user session and returns object containing details.
 * Throws on error.
 * @param {string} username 
 * @param {string} password 
 */
const authenticateByCredidentals = async(username, password) => {
  var user = await userService.getByUsernameAndPassword(username, password)
  if (!user) {
    throw new exception.unauthorized('Bad credidentals')
  }
  
  var existingSession = getActiveSessionForUserId(user.id)
  if (existingSession) {
    /* User was already logged in */
    return existingSession
  }

  /* Create new session */
  var newSession = new userSession(user)
  activeSessions.set(newSession.token, newSession)

  /* Save session time and IP to database */
  user.update({
    lastLogin: new Date().getTime()
  })
  
  logger.log('User user session created. User: ' + user.username + ' session id: ' + newSession.id, logger.DEBUG)
  return newSession
}

/**
 * Ends user session
 * @param {*} session 
 */
const logout = (session) => {
  activeSessions.delete(session.token)
  logger.log('User ' + session.user.username + ' has logged out.', logger.DEBUG)
}

/**
 * Returns active session for token, or null if not available
 * @param {string} token 
 */
const getSessionForToken = (token) => {
  var session = activeSessions.get(token)
  if (session) {
    return session
  }
  return null
}

/**s
 * Gets active session fro user
 * @param {number} userId 
 */
const getActiveSessionForUserId = (userId) => {
  for (const value of activeSessions.values()) {
    if (value.user.id == userId && !value.hasExpired()) {
      return value
    }
  }
  return null
}

/**
 * Extracts auth token from header to handle request authorization.  
 * If everything is OK .auth property containing all auth details 
 * will be added to to request, and next functon called. 
 * In case of error/unautorized access, exception will be thrown.
 * @param {*} request 
 */
const authMidlewareHandler = (req, res, next) => {
  var authHeader = req.get('Authorization')
  if (!authHeader) {
    throw new exception.unauthorized('No authorization header')
  }
  var tokenSplit = authHeader.split(/\s+/) 
  if (tokenSplit[0] !== 'Bearer') {
    throw new exception.badRequest('Invalid token type')
  }
  var authSession = getSessionForToken(tokenSplit[1])
  if (!authSession) {
    throw new exception.unauthorized('Invalid token')
  }
  if (authSession.hasExpired()) {
    throw new exception.unauthorized('Session expired')
  }
  
  /* Stores session to request object, so that controllers can access it */
  req.auth = authSession
  next()
}

/**
 * Extracts and returns basic data about session
 * @param {*} session 
 */
const getInfo = (session) => {
  return {
    id: session.id,
    username: session.user.username,
    timeLeft: session.timeLeft()
  }
}

module.exports = {
  authenticateByCredidentals,
  logout,
  getActiveSessionForUserId,
  getSessionForToken,
  authMidlewareHandler,
  getInfo
}