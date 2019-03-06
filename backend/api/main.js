const express = require("express");

let router = express.Router();


router.use('/hello_wolrd_test', require('./hello_world'));


module.exports = router