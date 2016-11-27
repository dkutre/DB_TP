var express  = require('express');
var callback = require('../response');
var router   = express.Router();
var functions = require('../functions/functions');


router.use(function (req, res, next) {
  console.log("/general");
  next();
});

router.post('/clear', function (req, res) {
  console.log('clear');
  functions.clear(callback(res));
});

router.get('/status', function (req, res) {
  console.log('status');
  functions.status(callback(res));
});

module.exports = router;
