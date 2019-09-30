const { logger, generator } = require('../utils')
const userService = require('./user')
const utils = require('util')
const exception = require('../exception')
const authSessionModel = require('../model').auth_session

/**
 * How long can a single user session last (in miliseconds) 
 * User will be logged out after specified amount of time has passed
 * TODO: Move to config
 */
const USER_SESSION_TIMEOUT = 3600 * 1000
const ACCESS_TOKEN_LENGTH = 64

/**
 * Array of all currently active user sessions. Maped by access token
 * TODO: 'Cron job' to clear expired sessions
 */
var activeSessions = new Map()

/**
 * Used to generate session ID
 */
var sessionIdCounter = 0

/**
 * Load all saved active sessions from DB
 */
async function loadSessions() {
  var sessions = await authSessionModel.findAll()
  sessionIdCounter = 0

  for (var i = 0; i < sessions.length; i++) {
    var session = sessions[i]

    if (session.id > sessionIdCounter) {
      sessionIdCounter = session.id
    }
    var newSession = new authSession(session.id, null, session.token, session.startTime);
    if (newSession.hasExpired()) {
      // Sesison has expired... Delete from DB
      logger.log("Saved session expired.". logger.DEBUG)
      session.destroy()
    } else {
      var user = await userService.getById(session.userId)
      if (user == null) {
        // User dose not exists anymore. Destroy session
        session.destroy()
        logger.log("User for saved session dose not exists.". logger.WARNING)
        return
      }
      newSession.user = user
      activeSessions.set(newSession.token, newSession)
    }
  }

  sessionIdCounter++

  console.log("AUTH: Loaded " + activeSessions.size + " auth sessions from DB")
}

/**
 * Generates new authSession for user
 * 
 * @param {user model} user 
 * @param {string} token 
 */
function newUserSession(user) {
  sessionIdCounter += 1
  var newSession =  new authSession(sessionIdCounter, user, generateAccessToken(), new Date().getTime())
  // Save new auth session to database
  const sessionObj = authSessionModel.build({token: newSession.token, startTime: newSession.startTime, userId: newSession.user.id})
  sessionObj.save().then(() => {
    logger.log("New user session saved!", logger.INFO)
  })

  return newSession
}

/**
 * Auth session producer function
 */
function authSession(id, user, token, startTime) {
  this.id = id
  this.user = user
  this.token = token
  this.startTime = startTime

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
  var newSession = newUserSession(user)
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

/**
 * Returns whether use session is still valid or not 
 */
const isValid = (session) => {
  return !session.hasExpired()
}

loadSessions();

module.exports = {
  authenticateByCredidentals,
  logout,
  getActiveSessionForUserId,
  getSessionForToken,
  authMidlewareHandler,
  getInfo,
  isValid
}