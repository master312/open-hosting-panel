const express = require("express");

let router = express.Router();
router.apiPath = "/services";

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

/* TODO: STUB */
router.get('/:id', (req, res) => {
  if (req.params.id != 13 && req.params.id != 14) {
    res.status(404);
    res.send("Service not found");
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

// router.post('/new', (req, res) => {
//   /* TODO .... */
//   console.log(req.body);
//   res.status(204);
//   res.send();
// });

var apiNew = require('./new');
router.use(apiNew.apiPath, apiNew);

module.exports = router;