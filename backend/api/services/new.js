const express = require('express');
const logger = require('../../core/logger')

let router = express.Router();
router.apiPath = '/new';

/* Validates new service json data 
 * TODO: STUB */
function validateData(jsonData) {
  return !(jsonData == null || jsonData.name == null || jsonData.type == null || jsonData.domain == null);
}

function generateResponse(id, type, success, message) {
  var response = {};
  if (success) {
    response['id'] = id;
    response['type'] = type;
  }
  response['success'] = success;
  response['message'] = message;
  return response;
}

/* TODO: STUB */
router.post('/', (req, res) => {
  var jsonData = req.body;
  if (!validateData(jsonData)) {
    /* Bad request */
    res.status(400);
    res.send(generateResponse(null, null, false, 'Invalid body data.'));
    logger.log('Could not create new service. Invalid user data.', logger.EXCEPTION);
    return;
  }
  
  /* TODO: Create new service here! */

  res.send(generateResponse(1666, jsonData.type, true, 'Service created successfully.'));
  logger.log('New service created.', logger.INFO);
});


module.exports = router;