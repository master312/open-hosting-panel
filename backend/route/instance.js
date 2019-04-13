const express = require('express')

const { instance } = require('../controller')

const router = express.Router()

/* Returns list of all instances */
router.get('/', instance.getAll)

/* Returns details of single instance by ID */
router.get('/:id', instance.get)

/* Returns list of all available instance runners (nodejs, php, java, etc...) */
router.get('/runners', instance.getRunners)

/* Create new instance */
router.post('/new', instance.newInstance)

/* Start instance */
router.put('/start/:id', instance.start)

/* Stop instance */
router.put('/stop/:id', instance.stop)

/* Restart instance */
router.put('/restart/:id', instance.restart)

/* Deletes instance */
router.put('/delete/:id', instance.deleteInstance)

/* Edit instance */
router.post('/edit/:id', instance.edit)

module.exports = router
