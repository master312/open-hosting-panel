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
    throw new exception.notFound('Bad credidentals')
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
  
  logger.log("User user session created. User: " + user.username + " session id: " + newSession.id);
  return newSession
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

module.exports = {
  authenticateByCredidentals,
  getActiveSessionForUserId,
  getSessionForToken
}