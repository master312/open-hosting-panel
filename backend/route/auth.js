const { auth } = require('../controller')

const router = require('../router')();

/**
 * Authenticate user and returns access token
 */
router.post('/login', auth.login)

/**
 * Creates new user account for public user
 */
router.post('/register', auth.register)

/**
 * Ends user session
 */
router.secure('/logout')
router.post('/logout', auth.logout)

/**
 * Returns current session info
 */
router.secure('/info')
router.get('/info', auth.info)

/**
 * Returns if current session is valid or not
 */
router.secure('/checkValid')
router.get('/checkValid', auth.checkValid)

module.exports = router

