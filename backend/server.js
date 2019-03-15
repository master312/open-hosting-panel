const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/database')

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