const express = require('express');

let router = express.Router();

function useApiRouter(filename) {
  var functionRouter = require(filename);
  router.use(functionRouter.apiPath, functionRouter);
}

useApiRouter('./hello-world');
useApiRouter('./services/service');


module.exports = router