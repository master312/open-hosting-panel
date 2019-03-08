const express = require("express");

let router = express.Router();

function useApiRouter(filename) {
  var functionRouter = require(filename);
  router.use(functionRouter.apiPath, functionRouter);
}

useApiRouter('./hello_world');
useApiRouter('./services/services');

module.exports = router