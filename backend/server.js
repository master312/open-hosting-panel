const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const authService = require('./service/auth')
const { logger } = require('./utils')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('App is working'))


function useAuthenticatedRouter(path, router) {
  var authenticationHandler = function (req, res, next) {
    /* TODO: Move this handler to service */
    
    var authHeader = req.get('Authorization')
    if (!authHeader) {
      /* Missing header */
      res.status(401)
      res.send()
      return
    }
    var tokenSplit = authHeader.split(/\s+/); 
    if (tokenSplit[0] !== 'Bearer') {
      res.status(401)
      res.send('Invalid token type ' + tokenSplit[0])
      return;
    }
    var authSession = authService.getSessionForToken(tokenSplit[1])
    if (!authSession) {
      /* Invalid token */
      res.status(401)
      res.send('Invalid token')
      return
    }
    if (authSession.hasExpired()) {
      /* Session expired */
      res.status(401)
      res.send('Session expired')
      return
    }
    
    /* Stores session to request object, so that controllers can access it */
    req.auth = authSession
    next()
  }
  
  app.use(path, authenticationHandler)
  app.use(path, router)
}

require('./model')

/* Make use of routes */
app.use('/auth', require('./route/auth'))
useAuthenticatedRouter('/api/instance', require('./route/instance'))

/* Exception handling method */
app.use(function (err, req, res, next) {
  if (err.statusCode == 500) {
    /* Log to console ONLY on error 500*/
    logger.log("ExpressException:" + err.message + " STACK: " + err.stack, logger.EXCEPTION);
  }
  res.status(err.statusCode || 500).send(err.message || 'Server error')
})

app.listen(port, () => console.log('Server running on port ' + port))

module.exports = {
  app
}

// function sleep(ms){
//   return new Promise(resolve=>{
//       setTimeout(resolve,ms)
//   })
// }
// async function testA() {
//   console.log("pre")
//   await sleep(1000)
//   console.log("after")
// }

// console.log("a")
// testA()
// console.log("b")