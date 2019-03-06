const express = require('express');

const app = express();

const port = 5000;


app.use('/api', require('./api/main'));


app.listen(port, () => 'Server running on port ${port}');