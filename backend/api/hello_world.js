const express = require("express");

let router = express.Router();

router.get('/', (req, res) => {

  const demoData = [
    {id: 1, data1: 'like WAAT?', subData: 'I AM GOD'},
    {id: 2, data1: 'Jesus is that you?', subData: 'Nope'},
    {id: 2, data1: 'Can you hear me???', subData: 'YEEES, FUCKING YeeeeeeeS'},
  ];

  console.log("Got hello_wolrd_test request and responded with dataaaaaaa");
  res.json(demoData);
});


module.exports = router