const { credidentalProvider } = require('../controller')

const router = require('../router')()

/**
 * Secure every end point on this router
 */
router.secure()

/**
 * Returns list of all credidentals (username and ID's only)
 * @param {string} @type is credidental type (EX: GIT-SSH, GIT-USER, FTP, etc...) Actuall available types defined in service.js
 */
router.get('/:type', credidentalProvider.get)


module.exports = router
