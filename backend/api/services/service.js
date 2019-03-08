const express = require("express");

let router = express.Router();
router.apiPath = "/service";

/* TODO: STUB */
router.get('/', (req, res) => {
  const demoData = {
    "count": 2,
    "service": [
      {"id":13, "type":"nodejs", "name":"the_service", "state":"running"},
      {"id":14, "type":"nodejs", "name":"jesus_christ_srv", "state":"stopped"}
    ]
  };
  res.json(demoData);
});

/* Checks if service with ID exists, and if its owned by properr user */
function checkServiceId(req, res) {
  if (req.params.id && (req.params.id == 13 || req.params.id == 14)) {
    return true;
  }
  res.status(404);
  res.send({"message": "Service not found"});
  return false;
}

/* TODO: STUB */
router.get('/:id', (req, res) => {
  if (!checkServiceId(req, res)) {
    return;
  }

  const demoData = {
    "id": req.params.id,
    "type": "nodejs", 
    "state": "running",
    "name": "the_service",
    "domain": "the_service.com",
    "uptime": "4235345"              // Upime in seconds
  };
  res.json(demoData);
});

/* TODO: STUB */
router.post('/delete/:id', (req, res) => {
  if (!checkServiceId(req, res)) {
    return;
  }
  res.status(204);
  res.send();
});

var apiNew = require('./new');
router.use(apiNew.apiPath, apiNew);

module.exports = router;