const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())


app.use('/api', require('./api/api'));


app.listen(port, () => 'Server running on port ${port}');