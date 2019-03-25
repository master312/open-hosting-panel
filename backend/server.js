const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database')

// var runnerManager = require('./runner');
// runnerManager.init();

// var nodeRunner = runnerManager.get('NodeJS', '10.15.3');
// console.log(nodeRunner);

// cft = require('./runner/config');

// var tmp = new cft();
// tmp.test = 123;
// tmp.test2 = 34;
// console.log(tmp);

// var tmp2 = new cft();
// tmp2.test = 666;
// tmp2.kurcina = 6767;
// console.log(tmp2);

// var tmp3 = Object.assign({}, tmp2);
// tmp3.asdda = 1424;
// console.log(tmp3);

// tmp2.kurcina = -111;
// console.log(tmp2);
// console.log(tmp3);

// EXTENDING EXMAPLE
// function Person() {
//   this.name = "mame";
//   this.value = "value";
// }

// var tmpP = new Person();

// ITERTE TROUGHT PROPERTY
// for (var property in tmpP) {
//   if (tmpP.hasOwnProperty(property)) {
//       console.log(property);
//   }

// function ExtendPerson() {
//   Object.assign(this, new Person());
//   this.extendedProp = 11;
//   this.kurcina = "5345string";
// }

// var tmpEP = new ExtendPerson();

// console.log(tmpP);
// console.log(tmpEP);

const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function useAuthenticatedRouter(path, router) {
  var authenticationHandler = function (req, res, next) {
    var authHeader = req.get('Authorization');
    if (!authHeader) {
      /* Missing header */
      res.status(401);
      res.send();
      return;
    }
    if (authHeader != "Bearer 8d090338-935b-4afd-9c52-5792c1a74701") {
      /* Invalid token */
      res.status(401);
      res.send('Invalid token');
      return;
    }

    next();
  }
  
  app.use(path, authenticationHandler);
  app.use(path, router);
}

useAuthenticatedRouter('/api', require('./api/api'));


app.listen(port, () => 'Server running on port ${port}');

