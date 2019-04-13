const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('App is working'))


function useAuthenticatedRouter(path, router) {
  var authenticationHandler = function (req, res, next) {
    // TODO ...
    // var authHeader = req.get('Authorization');
    // if (!authHeader) {
    //   /* Missing header */
    //   res.status(401);
    //   res.send();
    //   return;
    // }
    // if (authHeader != "Bearer 8d090338-935b-4afd-9c52-5792c1a74701") {
    //   /* Invalid token */
    //   res.status(401);
    //   res.send('Invalid token');
    //   return;
    // }
    
    // TODO: Stub fake user data
    req.auth = {}
    req.auth.user = {
      id: 1,
      username: 'majmun666',
      permission: 3
    }

    next();
  }
  
  app.use(path, authenticationHandler);
  app.use(path, router);
}

require('./model')

useAuthenticatedRouter('/api/instance', require('./route/instance'));

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
// console.log("b");