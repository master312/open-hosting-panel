const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const authService = require('./service/auth')
const { logger } = require('./utils')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('App is working'))

require('./model')

/* Make use of routes */
app.use('/auth', require('./route/auth'))
app.use('/api/instance', require('./route/instance'))
app.use('/api/credidentals', require('./route/credidental_provider'))

/* Exception handling method */
app.use(function (err, req, res, next) {
  if (err.statusCode == 500) {
    /* Log to console ONLY on error 500 */
    logger.log("ExpressException:" + err.message + " STACK: " + err.stack, logger.EXCEPTION);
  }
  res.status(err.statusCode || 500).send(err.message || 'Server error')
})

app.listen(port, () => console.log('Server running on port ' + port))

module.exports = {
  app
}
