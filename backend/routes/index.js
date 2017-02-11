var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send({ status: 'ok' });
});

router.post('/message', (req, res, next) => {
  res.send({ msg: 'recieved' });
});

module.exports = router;
