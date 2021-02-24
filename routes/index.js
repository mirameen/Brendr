var express = require('express');
var router = express.Router();
var User = require("../models/User")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to Brendr');
});

router.post('/', function(req, res, next) {
  res.send('Welcome to Brendr');
});

module.exports = router;
