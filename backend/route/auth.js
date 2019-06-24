const express = require('express')

const { auth } = require('../controller')

const router = express.Router()

/**
 * Authenticate user and returns access token
 */
router.post('/login', auth.login)

/**
 * Creates new user account for public user
 */
router.post('/register', auth.register)


module.exports = router

