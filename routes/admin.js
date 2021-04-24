var express = require('express');
var router = express.Router();
var Item = require('../models/Item')
var User = require('../models/User')

router.get('/joining_dates', (req, res, next) => {
  User
    .find({})
    .then(users => res.json(users), err => console.log(err));
  console.log('Sent users')
});

function countBorrows(items) {
  var count = 0;
  for (var i = 0; i < items.length; ++i) {
    if (items[i].borrowlend) {
      count++;
    }
  }
  return count;
}

router.get('/borrows', (req, res, next) => {
  Item
    .find({})
    .then(items => res.json(countBorrows(items) / items.length), err => console.log(err));
  console.log('Sent users')
});

module.exports = router

